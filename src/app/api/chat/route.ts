import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { retrieveFromCV, buildFallbackRAGResponse } from "@/lib/rag-engine";

function createSimulatedStream(textToStream: string): Response {
  const encoder = new TextEncoder();
  const words = textToStream.split(/(?=[ \n])/);
  const stream = new ReadableStream({
    async start(controller) {
      const chunkSize = 3;
      for (let i = 0; i < words.length; i += chunkSize) {
        const text = words.slice(i, i + chunkSize).join("");
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
        );
        await new Promise((r) => setTimeout(r, 12));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

export async function POST(req: NextRequest) {
  let lastUserQuery = "";
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate input length (Guardrails)
    const lastMessage = messages[messages.length - 1];
    lastUserQuery = lastMessage.content || "";
    if (lastUserQuery.length > 1000) {
      return new Response(
        JSON.stringify({
          error: "Pesan terlalu panjang (maksimal 1000 karakter).",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. Check Local RAG Knowledge Base first (Instant <5ms response, zero network delay)
    const ragAnswer = retrieveFromCV(lastUserQuery);
    if (ragAnswer) {
      return createSimulatedStream(ragAnswer);
    }

    // 2. For open-ended questions, call Gemini Cloud API with fast fallback to Local RAG
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return createSimulatedStream(buildFallbackRAGResponse(lastUserQuery));
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemPrompt = buildSystemPrompt();

    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await Promise.race([
      ai.models.generateContentStream({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.6,
          topP: 0.9,
          maxOutputTokens: 1024,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini API timeout")), 3500)
      ),
    ]);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of response) {
            const text = chunk.text || "";
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          console.error("Stream error, falling back to RAG:", err);
          const fallbackText = buildFallbackRAGResponse(lastUserQuery);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: fallbackText })}\n\n`)
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: unknown) {
    console.warn("Gemini API unavailable (503/timeout), serving from Local RAG:", error);
    // If Gemini is overloaded (503) or rate-limited, gracefully answer from Local RAG!
    return createSimulatedStream(buildFallbackRAGResponse(lastUserQuery));
  }
}
