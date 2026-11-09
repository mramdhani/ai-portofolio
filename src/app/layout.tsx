import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhamad Ramdani — Software Engineer",
  description:
    "Portfolio & AI Chat — Software Engineer specialising in enterprise frontend development with React, Vue.js and TypeScript.",
  openGraph: {
    title: "Muhamad Ramdani — Software Engineer",
    description:
      "Interactive AI-powered portfolio. Ask anything about my experience, projects, and tech stack.",
    url: "https://muhramdani.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
