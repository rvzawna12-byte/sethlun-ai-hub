'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ChatPage() {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Chibai! Kei Vanlalzawna AI ka ni e. Eng nge ka puih theih che?' }])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', text: input }]
    setMessages(newMessages)
    setInput('')
    
    // AI chhanna lem
    setTimeout(() => {
      setMessages([...newMessages, { role: 'ai', text: `I thu "${input}" kha ka hria e. Hei hi Vanlalzawna AI Hub atanga chhanna a ni! Tunah chuan AI tak tak kan la thlun lo a, mahse a hmanhmawh lo, a design a mawi tawh lutuk! 🚀` }])
    }, 800)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="bg-zinc-800 px-4 py-2 rounded-full text-sm">← Hawng</Link>
          <h1 className="text-2xl font-bold">🤖 Chat AI</h1>
        </div>

        <div className="flex-1 bg-zinc-900 rounded-2xl p-4 overflow-y-auto mb-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`p-3 rounded-xl max-w-[80%] ${m.role === 'user' ? 'bg-white text-black ml-auto' : 'bg-zinc-800'}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="I thu ziak rawh..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-5 py-3 outline-none"
          />
          <button onClick={sendMessage} className="bg-white text-black px-6 py-3 rounded-full font-bold">Tir</button>
        </div>
      </div>
    </div>
  )
}