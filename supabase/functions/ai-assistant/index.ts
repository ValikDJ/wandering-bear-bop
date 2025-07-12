import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import OpenAI from "https://deno.land/x/openai@v4.38.5/mod.ts"; // Імпорт для OpenAI API

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

    // Отримання OpenAI API ключа зі змінних оточення
    const openaiApiKey = Deno.env.get('openai_api_key'); // Змінено назву секрету

    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables.');
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Можеш змінити на іншу модель, наприклад "gpt-4"
      messages: [
        {
          role: "system",
          content: "Ти - доброзиричливий та корисний помічник для дітей, які вивчають HTML та CSS. Твоя мета - надавати прості, зрозумілі та заохочувальні відповіді на їхні запитання. Використовуй українську мову. Якщо питання не стосується HTML, CSS або веб-розробки, ввічливо перенаправ його до теми уроку.",
        },
        {
          role: "user",
          content: query,
        },
      ],
      max_tokens: 150,
    });

    const aiResponseText = completion.choices[0].message.content;

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