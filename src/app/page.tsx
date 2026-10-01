import Link from 'next/link'

export default function Home() {
  const tools = [
    { name: 'Image AI', icon: '🖼️', desc: 'Thlalak siamna', href: '/image', color: 'from-purple-500 to-pink-500' },
    { name: 'Chat AI', icon: '💬', desc: 'Zawhna zawtna', href: '/chat', color: 'from-blue-500 to-cyan-500' },
    { name: 'Code AI', icon: '💻', desc: 'Code siamna', href: '/code', color: 'from-green-500 to-emerald-500' },
    { name: 'Video AI', icon: '🎬', desc: 'Video frame siamna', href: '/video', color: 'from-orange-500 to-red-500' },
    { name: 'Music AI', icon: '🎵', desc: 'Hla lyrics siamna', href: '/music', color: 'from-pink-500 to-rose-500' },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm text-zinc-400 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Mizoram AI Hub - Live
          </div>
          <h1 className="text-6xl font-black mb-4 tracking-tight">
            SETHLUN <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">AI HUB</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A free a AI tools - Image, Chat, Code, Video, Music siam theihna.
          </p>
          <div className="mt-8 flex gap-3 justify-center">
            <div className="text-sm text-zinc-500">Siamtu: <span className="text-white font-bold">Sethlun</span> • Serkawn</div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.name} href={tool.href} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-all hover:scale-[1.02]">
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`}></div>
              <div className="relative">
                <div className="text-5xl mb-4">{tool.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
                <p className="text-zinc-400 mb-6">{tool.desc}</p>
                <div className="flex items-center text-sm font-bold group-hover:gap-2 gap-1 transition-all">
                  Hawng rawh <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
          
          {/* Coming Soon Card */}
          <div className="bg-zinc-900/50 border border-dashed border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-3 opacity-50">✨</div>
            <h3 className="font-bold text-zinc-300">Voice AI</h3>
            <p className="text-sm text-zinc-500 mt-1">Lo thleng thuai ang!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center border-t border-zinc-900 pt-8">
          <p className="text-zinc-600 text-sm">© 2026 Sethlun AI Hub • Made in Mizoram with ❤️ • Free for all Mizo</p>
        </div>
      </div>
    </div>
  )
}
