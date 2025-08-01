export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a warm, supportive grief companion for teens and young adults. You listen calmly, never rush to fix, and always validate feelings.",
        },
        {
          role: "user",
          content: req.body.message,
        }
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "I'm here for you.";

  res.status(200).json({ reply });
}
