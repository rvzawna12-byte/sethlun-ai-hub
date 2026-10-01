'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function VideoPage() {
  const [prompt, setPrompt] = useState('')
  const [frames, setFrames] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  async function generate() {
    if(!prompt.trim()) return
    setLoading(true)
    setFrames([])
    const newFrames = []
    // 4 frames siam ang, video ang deuh in
    for(let i=0; i<4; i++){
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ` cinematic video frame ${i+1}`)}?width=1024&height=576&seed=${Math.random()+i}&model=flux&nologo=true`
      newFrames.push(url)
    }
    setFrames(newFrames)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-zinc-400 hover:text-white">← Haw kir</Link>
        <h1 className="text-4xl font-bold mt-6">Video AI 🎬</h1>
        <p className="text-zinc-400 mt-2">I video duh sawi la, 4 frames in a lo siam ang - video ang deuh in!</p>

        <div className="flex gap-2 mt-8 mb-6">
          <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Eg: Mizo nula Zoram ah a tlan, cinematic" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white"/>
          <button onClick={generate} className="bg-white text-black px-6 py-3 rounded-xl font-bold">{loading?'Siam mek...':'Siam rawh'}</button>
        </div>

        {frames.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {frames.map((f,i)=>(
              <img key={i} src={f} className="rounded-2xl border border-zinc-800 w-full aspect-video object-cover" alt={`frame ${i}`}/>
            ))}
            <div className="col-span-2 mt-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-center text-zinc-400 text-sm">
              💡 Tip: Heng frames hi CapCut ah emaw, video editor ah i dah khawm chuan video a ni mai!
              <br/>A tak Video AI (Sora, Luma) chu pawisa a ngai a, hemi hi FREE version a ni.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
