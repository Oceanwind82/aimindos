import { NextRequest } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  if (!Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'Invalid messages format' }), { status: 400 });
  }
  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });
    return new Response(JSON.stringify({ reply: chat.choices[0].message }), { status: 200 });
  } catch (err) {
    const errorMessage =
      typeof err === 'object' && err !== null && 'message' in err
        ? (err as { message: string }).message
        : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
