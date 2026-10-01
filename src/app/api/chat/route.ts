export async function POST(req: Request){
  try{
    const b=await req.json();
    const q=b.messages?.[b.messages.length-1]?.content||"";
    const k=process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if(!k) return Response.json({reply:"Vercel ah Key a awm lo"});
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${k}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:q}]}]})});
    const d=await r.json();
    if(d.error) return Response.json({reply:"Google: "+d.error.message});
    return Response.json({reply:d.candidates?.[0]?.content?.parts?.[0]?.text||"Chhanna awm lo"});
  }catch(e:any){return Response.json({reply:"Error: "+e.message});}
}
