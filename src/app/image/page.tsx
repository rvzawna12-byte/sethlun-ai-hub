'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ImagePage() {
  const [prompt, setPrompt] = useState('')
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)

  function generate() {
    if (!prompt) return
    setLoading(true)
    setImg('')
    // Pollinations AI - Free, key ngai lo!
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Math.random()}&nologo=true`
    setImg(url)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-400 hover:text-white">← Hawng</Link>
        <h1 className="text-4xl font-black mt-6">🎨 Sethlun Image AI</h1>
        <p className="text-zinc-400 mt-2">I duh ang thlalak sawi la, ka siam ang!</p>

        <div className="mt-8 flex gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generate()}
            placeholder="Entirnan: Mizo hmeichhe nalh tak, Lunglei tlâng ah..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-5 py-4 outline-none focus:border-white"
          />
          <button onClick={generate} className="bg-white text-black px-8 rounded-full font-bold hover:bg-zinc-200">
            Siam
          </button>
        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-4 min-h-[400px] flex items-center justify-center">
          {loading && <p className="text-zinc-500">Siam mek...</p>}
          {!img &&!loading && <p className="text-zinc-600">Thlalak a la awm lo, chung ah khan ziak rawh!</p>}
          {img && <img src={img} alt="generated" className="rounded-2xl w-full" />}
        </div>

        {img && <a href={img} target="_blank" className="block text-center mt-4 text-zinc-400 underline">Download</a>}
      </div>
    </div>
  )
}