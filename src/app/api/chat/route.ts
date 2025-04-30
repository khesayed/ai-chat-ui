export async function POST(req: Request) {
  const { message } = await req.json();

  const SYSTEM_PROMPT = {
    role: "system",
    content: "Your name is kale!, developed by Khesayed",
  };

  const ollamaRes = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({
      model: "qwen3:1.7b",
      messages: [SYSTEM_PROMPT, { role: "user", content: message }],
      stream: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
  const stream = new ReadableStream({
    async start(controller) {
      const reader = ollamaRes.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        controller.enqueue(decoder.decode(value));
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  });
}
