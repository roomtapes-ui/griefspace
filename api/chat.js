export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    console.error("❌ No API key found");
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
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are GriefSpace, a warm, supportive grief companion for teens and young adults. Validate their feelings. Respond gently. Avoid robotic language.",
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
    console.log("🧠 OpenAI raw response:", JSON.stringify(data, null, 2));

    const reply = data.choices?.[0]?.message?.content || "I'm here for you.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error("🔥 Error from OpenAI:", error);
    res.status(500).json({ reply: "Something went wrong. Please try again later." });
  }
}

