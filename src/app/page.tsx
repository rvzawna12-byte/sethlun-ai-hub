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
      const fullPrompt = `You are a expert coder. Write clean code for this: ${prompt}. Only give code with short explanation in Mizo if possible.`
      const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}?model=openai`)
      const data = await res.text()
      setCode(data)
    } catch {
      setCode('Tihsual a awm, try leh rawh!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-zinc-400 hover:text-white">← Haw kir</Link>
        <h1 className="text-4xl font-bold mt-6 mb-2">Code AI 💻</h1>
        <p className="text-zinc-400 mb-8">I code mamawh sawi la, a siam nghal ang!</p>

        <div className="flex gap-2 mb-6">
          <input value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>e.key==='Enter' && generate()} placeholder="Eg: Login page React in siam rawh..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white"/>
          <button onClick={generate} disabled={loading} className="bg-white text-black px-6 py-3 rounded-xl font-bold disabled:opacity-50">
            {loading ? 'Ziah mek...' : 'Siam rawh'}
          </button>
        </div>

        {code && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 relative">
            <button onClick={()=>navigator.clipboard.writeText(code)} className="absolute top-4 right-4 bg-zinc-800 px-3 py-1 rounded-lg text-sm hover:bg-zinc-700">Copy</button>
            <pre className="whitespace-pre-wrap text-sm text-zinc-200 overflow-auto">{code}</pre>
          </div>
        )}

        {!code && !loading && (
          <div className="text-center py-20 text-zinc-600 border border-dashed border-zinc-800 rounded-2xl">
            I code duh ziak la, a lo chhuak ang
          </div>
        )}
      </div>
    </div>
  )
}
