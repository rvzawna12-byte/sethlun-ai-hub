'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

export default function MusicPage() {
  const [prompt, setPrompt] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  async function generate() {
    if(!prompt.trim()) return
    setLoading(true)
    setLyrics('')
    try {
      const p = `Write a short Mizo/English song lyrics for: ${prompt}. Structure: Verse, Chorus, Verse. Keep it short and catchy.`
      const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(p)}?model=openai`)
      const data = await res.text()
      setLyrics(data)
    } catch {
      setLyrics('Tihsual a awm!')
    }
    setLoading(false)
  }

  function playBeat() {
    setPlaying(!playing)
    // Simple beat lo play tir ang
    if(!playing) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 220
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2)
      setTimeout(()=>{osc.stop(); setPlaying(false)}, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-400 hover:text-white">← Haw kir</Link>
        <h1 className="text-4xl font-bold mt-6">Music AI 🎵</h1>
        <p className="text-zinc-400 mt-2">I hla duh sawi la, lyrics leh beat ka lo siam ang!</p>

        <div className="flex gap-2 mt-8 mb-6">
          <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Eg: Lunglen hla, Mizo love song" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white"/>
          <button onClick={generate} className="bg-white text-black px-6 py-3 rounded-xl font-bold">{loading?'Siam mek...':'Siam rawh'}</button>
        </div>

        {lyrics && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">I Hla:</h3>
              <button onClick={playBeat} className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">
                {playing ? '⏸️ Tawp' : '▶️ Beat Play'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-zinc-200 leading-relaxed">{lyrics}</pre>
            
            <div className="mt-6 p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-sm text-zinc-400">
              💡 <b>Full Music duh chuan:</b> He lyrics hi <a href="https://suno.ai" target="_blank" className="text-white underline">suno.ai</a> ah paste la, a zai tir thei ang! A FREE!
            </div>
            <button onClick={()=>navigator.clipboard.writeText(lyrics)} className="mt-4 w-full bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl">Copy Lyrics</button>
          </div>
        )}
      </div>
    </div>
  )
}
