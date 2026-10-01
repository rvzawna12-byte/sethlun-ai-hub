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
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Math.random()}&nologo=true`
    setImg(url)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-400 hover:text-white">← Haw kir</Link>
        <h1 className="text-4xl font-bold mt-6 mb-2">Image AI 🎨</h1>
        <p className="text-zinc-400 mb-8">I duh ang thlalak ziak rawh - FREE, key ngai lo!</p>
        
        <div className="flex gap-2 mb-6">
          <input 
            value={prompt} 
            onChange={e=>setPrompt(e.target.value)}
            placeholder="Eg: Mizo nula hmeltha, traditional dress nen..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white"
            onKeyDown={e=> e.key==='Enter' && generate()}
          />
          <button onClick={generate} disabled={loading} className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 disabled:opacity-50">
            {loading ? 'Siam mek...' : 'Siam rawh'}
          </button>
        </div>

        {img && (
          <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <img src={img} alt="generated" className="w-full rounded-xl" onLoad={()=>setLoading(false)} />
            <a href={img} target="_blank" download className="mt-4 block text-center bg-zinc-800 py-2 rounded-xl hover:bg-zinc-700">Download</a>
          </div>
        )}
        {!img && !loading && (
          <div className="text-center py-20 text-zinc-600 border border-dashed border-zinc-800 rounded-2xl">
            Prompt ziak la, thlalak a lo chhuak ang
          </div>
        )}
      </div>
    </div>
  )
}
