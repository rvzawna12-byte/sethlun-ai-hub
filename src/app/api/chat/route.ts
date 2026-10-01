export const runtime = 'edge';
export async function POST(req: Request){
  const {messages} = await req.json();
  const q = messages?.at(-1)?.content || "";
  const k = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${k}`,{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({contents:[{parts:[{text:q}]}],generationConfig:{maxOutputTokens:500}})
  });
  const d = await r.json();
  return Response.json({reply:d.candidates?.[0]?.content?.parts?.[0]?.text || "Try leh rawh"});
}
