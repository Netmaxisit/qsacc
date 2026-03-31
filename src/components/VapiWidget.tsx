"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Vapi from "@vapi-ai/web";

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!;
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;

export default function VapiWidget() {
  const vapiRef = useRef<Vapi | null>(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const vapi = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;
    vapi.on("call-start", () => setActive(true));
    vapi.on("call-end", () => setActive(false));
    return () => { vapi.stop(); };
  }, []);

  const toggle = () => {
    if (!vapiRef.current) return;
    active ? vapiRef.current.stop() : vapiRef.current.start(ASSISTANT_ID ?? "");
  };

  return (
    /* Rightmost position: right: 24px — same row as WhatsApp & Chat */
    <div className="fixed z-50 flex flex-col items-center" style={{ bottom: "24px", right: "172px" }}>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
            style={{ background: "#D3B267", color: "#1A2B2E" }}
          >
            {active ? "End call" : "Voice AI"}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={active ? "End voice call" : "Start voice call with Sophie"}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: active ? "#D3B267" : "#0E5D6B",
          boxShadow: "0 4px 16px rgba(14,93,107,0.45)",
        }}
      >
        {active ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07"/>
            <path d="M14.49 9.18a16 16 0 0 0-2.47-2.79 2 2 0 0 0-2.14-.34l-1.11.55a2 2 0 0 1-2.34-.43L4.18 4.5"/>
            <line x1="2" y1="2" x2="22" y2="22"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        )}
      </motion.button>
    </div>
  );
}
