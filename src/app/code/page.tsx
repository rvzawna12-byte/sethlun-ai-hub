'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function CodePage() {
  const [prompt, setPrompt] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  async function generate() {
    if(!prompt.trim()) return
    setLoading(true)
    setCode('')
    try {
      const fullPrompt = `You are expert coder. Write code for: ${prompt}.`
      const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}?model=openai`)
      const data = await res.text()
      setCode(data)
    } catch {
      setCode('Error a awm!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-zinc-400 hover:text-white">← Haw kir</Link>
        <h1 className="text-4xl font-bold mt-6 mb-2">Code AI 💻</h1>
        <div className="flex gap-2 mb-6 mt-8">
          <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Login page React in..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none"/>
          <button onClick={generate} className="bg-white text-black px-6 py-3 rounded-xl font-bold">{loading?'Siam mek...':'Siam rawh'}</button>
        </div>
        {code && <pre className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 whitespace-pre-wrap text-sm">{code}</pre>}
      </div>
    </div>
  )
}
