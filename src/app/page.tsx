import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-center mt-10">Vanlalzawna AI Hub 🚀</h1>
        <p className="text-center text-zinc-400 mt-3">Sethlun atanga khawvel huap AI</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <div className="text-4xl">🤖</div>
            <h2 className="text-2xl font-bold mt-4">Chat AI</h2>
            <p className="text-zinc-400 mt-2 text-sm">I zawhna zawng zawng chhang thei</p>
            <Link href="/chat" className="block text-center bg-white text-black mt-6 py-3 rounded-full font-bold">Hawng</Link>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl opacity-60">
            <div className="text-4xl">🎨</div>
            <h2 className="text-2xl font-bold mt-4">Image AI</h2>
            <p className="text-zinc-400 mt-2 text-sm">Thlalak siamna - Si mek!</p>
            <div className="block text-center bg-zinc-800 text-zinc-500 mt-6 py-3 rounded-full font-bold">Si mek</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl opacity-60">
            <div className="text-4xl">🎵</div>
            <h2 className="text-2xl font-bold mt-4">Music AI</h2>
            <p className="text-zinc-400 mt-2 text-sm">Hla siamna - Si mek!</p>
            <div className="block text-center bg-zinc-800 text-zinc-500 mt-6 py-3 rounded-full font-bold">Si mek</div>
          </div>
        </div>
      </div>
    </div>
  )
}