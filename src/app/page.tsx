"use client";

import { useState } from "react";
import { useChatStream } from "./hooks/useChatStream";
import { RenderAIContent } from "./components/RenderAIContent";
import { ProfileCircle, CpuCharge } from "iconsax-react";

const Home = () => {
  const { messages, sendMessage } = useChatStream();
  const [input, setInput] = useState("");

  return (
    <div className="flex w-full flex-col max-w-2xl mx-auto">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <h1 className="text-center text-4xl font-bold">
          <span className="inline bg-linear-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-4xl tracking-tight text-transparent">
            LocAi Qwen3 Assistant
          </span>
        </h1>
        <h2 className="text-center mt-3 mb-7 text-xl tracking-tight text-slate-400">
          A local AI designed to think deeply and act clearly.
        </h2>

        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1">
                {msg.role === "user" ? (
                  <ProfileCircle size="24" color="#60a5fa" variant="Bulk" />
                ) : (
                  <CpuCharge
                    size="24"
                    color="#34d399"
                    variant="Bulk"
                    className="animate-pulse"
                  />
                )}
              </div>
              <div
                className={`whitespace-pre-wrap px-4 py-7 rounded-lg relative rounded-2xl backdrop-blur-sm ${
                  msg.role === "user"
                    ? "bg-slate-800/60 text-blue-200"
                    : "bg-green-900/30 text-green-300 border border-green-950"
                }`}
              >
                {msg.role === "user" ? (
                  <>
                    <div className="absolute -top-px right-11 left-20 h-px bg-linear-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0"></div>
                    <div className="absolute right-20 -bottom-px left-11 h-px bg-linear-to-r from-blue-400/0 via-blue-400 to-blue-400/0"></div>
                  </>
                ) : (
                  <>
                    <div className="absolute -top-px right-11 left-20 h-px bg-linear-to-r from-green-300/0 via-green-300/70 to-green-300/0"></div>
                    <div className="absolute right-20 -bottom-px left-11 h-px bg-linear-to-r from-green-400/0 via-green-400 to-green-400/0"></div>
                  </>
                )}
                <RenderAIContent content={msg.content} />
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-7">
          <div className="absolute -top-px right-11 left-20 h-px bg-linear-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0"></div>
          <div className="absolute right-20 -bottom-px left-11 h-px bg-linear-to-r from-blue-400/0 via-blue-400 to-blue-400/0"></div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                sendMessage(input);
                setInput("");
              }
            }}
            className="flex mt-8 max-w-2xl mx-auto p-2 gap-2 rounded-3xl bg-[#0A101F]/80 dark:ring-1 dark:ring-slate-300/10"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2 text-white bg-none focus:outline-none"
              placeholder="Ask me anything..."
            />
            <button
              type="submit"
              className="py-2 px-7 rounded-3xl bg-slate-800/60 text-slate-400 ring-1 ring-white/10 text-sm"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
