export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMsg = messages[messages.length - 1]?.content || messages[messages.length - 1]?.text || "";

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return Response.json({ reply: "API Key a awm lo! Vercel Settings > Environment Variables ah GOOGLE_GENERATIVE_AI_API_KEY dah rawh." });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Nang chu Vanlalzawna AI i ni. Mizo tawng leh Sap tawng i thiam. Tawi leh fel takin chhang rawh. Zawhna: ${lastMsg}` }] }],
        }),
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Ka chhang thei lo, han zawt nawn leh teh.";

    return Response.json({ reply });
  } catch (e) {
    return Response.json({ reply: "Error a awm: " + String(e) });
  }
}
