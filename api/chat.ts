import { GoogleGenerativeAI } from '@google/generative-ai';

// Use Node.js environment variable, not import.meta.env
const API_KEY = process.env.VITE_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-Flash' });

    const prompt = `You are a helpful AI assistant. Respond to the following message in a friendly and informative way: ${message}`;

    // Set up streaming response
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    try {
      const result = await model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          res.write(`data: ${JSON.stringify({ content: chunkText })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (streamError) {
      console.error('Streaming error:', streamError);

      // Fallback to non-streaming response
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
        res.write('data: [DONE]\n\n');
        res.end();
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        res.write(`data: ${JSON.stringify({
          content: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment."
        })}\n\n`);
        res.write('data: [DONE]\n\n');
        res.end();
      }
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: 'Internal server error. Please check your API configuration.'
    });
  }
}
