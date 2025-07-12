import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.14.1"; // Імпорт для Gemini API

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Обробка CORS preflight запитів
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    // Отримання Gemini API ключа зі змінних оточення
    const geminiApiKey = Deno.env.get('gemini_api_key'); // Змінено назву секрету

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables.');
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Використання моделі Gemini Pro

    const prompt = `Ти - доброзиричливий та корисний помічник для дітей, які вивчають HTML та CSS. Твоя мета - надавати прості, зрозумілі та заохочувальні відповіді на їхні запитання. Використовуй українську мову. Якщо питання не стосується HTML, CSS або веб-розробки, ввічливо перенаправ його до теми уроку.

Ось запитання від дитини: "${query}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponseText = response.text(); // Отримання текстової відповіді від Gemini

    return new Response(
      JSON.stringify({ message: aiResponseText }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error processing AI request:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});