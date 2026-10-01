export async function POST(req: Request){
  try{
    const b=await req.json();
    const q=b.messages?.[b.messages.length-1]?.content||"";
    const k=process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const model="gemini-2.5-flash";
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${k}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:q}]}]})});
    const d=await r.json();
    if(d.error){
      // model hlui a nih leh chuan a thar ber try leh
      const r2=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${k}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:q}]}]})});
      const d2=await r2.json();
      if(d2.error) return Response.json({reply:"Google: "+d2.error.message});
      return Response.json({reply:d2.candidates?.[0]?.content?.parts?.[0]?.text});
    }
    return Response.json({reply:d.candidates?.[0]?.content?.parts?.[0]?.text});
  }catch(e:any){return Response.json({reply:"Error: "+e.message});}
}
