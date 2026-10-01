"use client";
import { useState } from "react";
import Link from "next/link";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "ai", content: "Chibai! Kei Vanlalzawna AI ka ni e. Eng nge ka puih theih che?" }]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(m => [...m, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ content: userMsg }] }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "ai", content: data.reply }]);
    } catch (e) {
      setMessages(m => [...m, { role: "ai", content: "Error: " + String(e) }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", color: "white", padding: "20px" }}>
      <Link href="/" style={{ color: "#aaa" }}>← Hawng</Link>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>🤖 Chat AI</h1>
      <div style={{ maxWidth: "700px", margin: "0 auto", background: "#1a1a2e", borderRadius: "15px", padding: "20px", minHeight: "60vh" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: "10px 0", textAlign: msg.role === "user" ? "right" : "left" }}>
            <div style={{ display: "inline-block", padding: "10px 15px", borderRadius: "15px", background: msg.role === "user" ? "#4f46e5" : "#2a2a4a", maxWidth: "80%" }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div>Ka ngaihtuah mek...</div>}
      </div>
      <div style={{ maxWidth: "700px", margin: "20px auto", display: "flex", gap: "10px" }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="I thu ziak rawh..." style={{ flex: 1, padding: "12px", borderRadius: "25px", border: "none", background: "#2a2a4a", color: "white" }} />
        <button onClick={send} style={{ padding: "12px 25px", borderRadius: "25px", border: "none", background: "white", color: "black", cursor: "pointer" }}>Tir</button>
      </div>
    </div>
  );
}
