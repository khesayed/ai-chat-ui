// https://github.com/ollama/ollama-js

import { useState } from "react";

export function useChatStream() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );

  const sendMessage = async (input: string) => {
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" },
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    let assistantContent = "";
    // Add placeholder assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (true) {
      const { value, done } = await reader!.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n").filter(Boolean);
      buffer = ""; // reset buffer to handle partial lines next

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.message?.role === "assistant") {
            assistantContent += json.message.content;

            // Update only the last message
            setMessages((prev) => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;
              updated[lastIndex] = {
                ...updated[lastIndex],
                content: assistantContent,
              };
              return updated;
            });
          }
        } catch {
          // Ignore invalid/incomplete JSON until full line comes in
          buffer += line; // re-buffer partial data
        }
      }
    }
  };

  return { messages, sendMessage };
}
