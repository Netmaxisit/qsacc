"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hello! I'm Sophie from QuickSolve Accountants. How can I help you today?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
      if (data.leadCaptured) setLeadCaptured(true);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed z-50" style={{ bottom: "24px", right: "96px" }} >
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: "340px",
              height: "480px",
              background: "#ffffff",
              border: "1px solid rgba(14,93,107,0.12)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: "#0E5D6B" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#D3B267" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white text-sm leading-tight">Sophie</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>QuickSolve Accountants · Online</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto text-white opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ background: "#F8FAFC" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? { background: "#0E5D6B", color: "#ffffff", borderBottomRightRadius: "4px" }
                        : { background: "#ffffff", color: "#1A2B2E", borderBottomLeftRadius: "4px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl px-4 py-3 flex gap-1 items-center"
                    style={{ background: "#ffffff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", borderBottomLeftRadius: "4px" }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ background: "#0E5D6B", animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Lead captured banner */}
            <AnimatePresence>
              {leadCaptured && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-2 px-4 py-2 flex-shrink-0 text-xs font-medium"
                  style={{ background: "#D3B267", color: "#1A2B2E" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Your details have been sent — we'll be in touch soon!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
              style={{ background: "#ffffff", borderTop: "1px solid rgba(14,93,107,0.1)" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Type a message..."
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "#1A2B2E" }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity"
                style={{
                  background: "#0E5D6B",
                  opacity: !input.trim() || loading ? 0.4 : 1,
                }}
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <AnimatePresence>
        {!open && hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
            style={{ background: "#D3B267", color: "#1A2B2E" }}
          >
            Chat with Sophie
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Open chat"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: open ? "#0A3F4A" : "#0E5D6B", boxShadow: "0 4px 16px rgba(14,93,107,0.45)" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
