# muhramdani.com — AI-Powered Interactive Portfolio & CV

An interactive developer portfolio featuring a real-time **AI Assistant & RAG Chatbot**, built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Google Gemini API (`@google/genai`)**.

Designed to allow recruiters, hiring managers, and tech leads to explore **Muhamad Ramdani's** 12+ years of software engineering experience, enterprise project contributions (**Bank BRI**, **AXA Mandiri**, **EMC Singapore**, **PLN**), and full-stack live applications (**PharmaStock**, **SMA PGRI Cibadak School System**) through both a clean minimalist UI and natural conversation.

🌐 **Live Website:** [https://muhramdani.com](https://muhramdani.com)

---

## ✨ Key Features & AI Architecture (The 4 AI Pillars)

1. **Hybrid RAG (Retrieval-Augmented Generation)**
   - Structured knowledge base ([`src/data/profile-data.json`](src/data/profile-data.json)) containing verified career history, enterprise project architectures, and technical skills.
   - **Instant Local RAG Engine** ([`src/lib/rag-engine.ts`](src/lib/rag-engine.ts)) resolves common recruiter queries in `< 5ms` with zero external latency, seamlessly falling back to **Google Gemini** for open-ended reasoning.
2. **Real-Time Streaming Responses (SSE)**
   - Built on Web Streams API (`ReadableStream`) and Server-Sent Events (`text/event-stream`) in [`src/app/api/chat/route.ts`](src/app/api/chat/route.ts) for a smooth word-by-word typing experience.
3. **Strict System Prompt Engineering**
   - Contextual system instructions ([`src/lib/system-prompt.ts`](src/lib/system-prompt.ts)) ensure the assistant represents Muhamad Ramdani accurately, professionally, and bilingually (English & Bahasa Indonesia).
4. **Input Guardrails & High-Availability Fallback**
   - Payload validation (character limits), topic boundary enforcement, anti-hallucination constraints, and automatic graceful fallback if the upstream LLM experiences high demand (`503`).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Minimalist dark UI)
- **AI / LLM:** Google Gemini API (`@google/genai` SDK) + Custom Local RAG Engine
- **Deployment Ready:** Vercel / Docker on Linux VPS

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts       # Streaming SSE endpoint (Local RAG + Gemini API)
│   │   ├── globals.css             # Minimalist dark theme & animations
│   │   ├── layout.tsx              # Root layout & OpenGraph metadata
│   │   └── page.tsx                # Split-screen layout (Profile Sidebar + AI Playground)
│   ├── components/
│   │   ├── ChatPlayground.tsx      # Interactive chat state & SSE stream reader
│   │   ├── ChatMessage.tsx         # Markdown/link formatter & message bubbles
│   │   ├── ChatInput.tsx           # Auto-resizing prompt textarea
│   │   ├── PromptChips.tsx         # Quick suggested prompts for recruiters
│   │   └── ProfileSection.tsx      # Traditional CV view (Skills, Projects, Experience)
│   ├── data/
│   │   └── profile-data.json       # Structured CV & project knowledge base
│   └── lib/
│       ├── rag-engine.ts           # Instant local retrieval & synthesis engine
│       └── system-prompt.ts        # Prompt engineering & guardrail rules
└── package.json
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/mrramdani/muhramdani.com.git
cd muhramdani.com
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

*(You can generate a free API key at [Google AI Studio](https://aistudio.google.com/apikey)).*

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📬 Contact

**Muhamad Ramdani** — *Software Engineer | Frontend Development*
- **Website:** [muhramdani.com](https://muhramdani.com)
- **LinkedIn:** [linkedin.com/in/mrramdani](https://linkedin.com/in/mrramdani)
- **Email:** [mr.ramdani@outlook.com](mailto:mr.ramdani@outlook.com)
