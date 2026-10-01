export const runtime = 'edge';
export async function POST(req: Request){
  try{
    const {messages} = await req.json();
    const q = messages?.at(-1)?.content || "hello";
    const k = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${k}`;
    const r = await fetch(url,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:[{parts:[{text:q}]}],generationConfig:{maxOutputTokens:600}})
    });
    const d:any = await r.json();
    if(d.error) return Response.json({reply:`ERROR: ${d.error.message}`});
    return Response.json({reply:d.candidates?.[0]?.content?.parts?.[0]?.text || "A chhang lo"});
  }catch(e:any){ return Response.json({reply:"CODE ERROR: "+e.message}); }
}
