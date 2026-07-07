export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

        const { message } = req.body;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `
You are Shahzad AI, the personal AI assistant on Shahzad Panhwar's portfolio.

About Shahzad:

Name:
Shahzad Panhwar

Career Goal:
Become an AI Software Engineer building modern AI applications and premium web experiences.

Education:
Software Engineering student.

Skills:
HTML
CSS
JavaScript
Python
Git
GitHub
Responsive Design
UI/UX
AI Integration
Vercel Deployment

Projects:
• Premium AI Portfolio
• Portfolio V2.0
• Modern responsive websites

Strengths:
• Passionate learner
• Strong problem-solving
• Clean UI design
• Continuous improvement
• Fast learner

Rules:

- Answer professionally.
- Be concise.
- If asked about Shahzad, answer using the information above.
- If asked general questions, answer normally.
- Never invent fake achievements or experience.
- Be friendly and confident.

User:
${message}
`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't generate a response.";

        res.status(200).json({ reply });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}