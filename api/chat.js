export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ reply: "Missing API key." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Change this if needed
        messages: [
          {
            role: "system",
            content: "You are GriefSpace, a warm, supportive grief companion for teens and young adults. You listen, validate, and never judge. Keep your tone soft, calm, and grounded. Don't sound robotic.",
          },
          {
            role: "user",
            content: req.body.message,
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || "I'm here for you.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ reply: "Something went wrong. Please try again later." });
  }
}
