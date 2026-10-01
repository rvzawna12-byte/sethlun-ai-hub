export const runtime = 'edge';
export async function POST(req: Request){
  try{
    const {messages} = await req.json();
    const q = messages?.at(-1)?.content || "hello";
    const k = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if(!k) return Response.json({reply:"API KEY A AWM LO"});
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${k}`;
    const r = await fetch(url,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:[{parts:[{text:q}]}],generationConfig:{maxOutputTokens:500}})
    });
    
    const d:any = await r.json();
    if(d.error) return Response.json({reply:`GOOGLE ERROR: ${d.error.code} - ${d.error.message}`});
    const txt = d.candidates?.[0]?.content?.parts?.[0]?.text;
    if(!txt) return Response.json({reply:`RESPONSE A AWM LO: ${JSON.stringify(d).slice(0,200)}`});
    return Response.json({reply:txt});
  }catch(e:any){
    return Response.json({reply:"CODE ERROR: "+e.message});
  }
}
