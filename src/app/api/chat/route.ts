export async function POST(req: Request){
  try{
    const b=await req.json();
    const q=b.messages?.[b.messages.length-1]?.content||"";
    const k=process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${k}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:q}]}]})});
    const d=await r.json();
    if(d.error) return Response.json({reply:"Google: "+d.error.message});
    return Response.json({reply:d.candidates?.[0]?.content?.parts?.[0]?.text});
  }catch(e:any){return Response.json({reply:"Error: "+e.message});}
}
