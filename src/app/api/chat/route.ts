export async function POST(req: Request){
  const b=await req.json();
  const q=b.messages?.at(-1)?.content||"";
  const k=process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const models=["gemini-2.5-flash","gemini-2.5-flash-lite","gemini-3.8-flash","gemini-3.7-flash"];
  for(const m of models){
    try{
      const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${k}`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({contents:[{parts:[{text:q}]}]})
      });
      const d=await r.json();
      const text=d.candidates?.[0]?.content?.parts?.[0]?.text;
      if(text) return Response.json({reply:text});
    }catch{}
  }
  return Response.json({reply:"Google model zawng zawng a buai rih, minute 1 hnu ah try leh rawh."});
}
