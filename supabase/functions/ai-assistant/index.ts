import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import OpenAI from "https://deno.land/x/openai@v4.52.0/mod.ts"; // Using Deno's OpenAI module

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    // Get the OpenAI API key from environment variables
    // Змінено назву секрету на нижній регістр згідно з вимогами Supabase UI
    const openaiApiKey = Deno.env.get('openai_api_key');

    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables.');
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    const prompt = `Ти - доброзичливий та корисний помічник для дітей, які вивчають HTML та CSS. Твоя мета - надавати прості, зрозумілі та заохочувальні відповіді на їхні запитання. Використовуй українську мову. Якщо питання не стосується HTML, CSS або веб-розробки, ввічливо перенаправ його до теми уроку.

Ось запитання від дитини: "${query}"`;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Можеш змінити на "gpt-4" або іншу модель, якщо маєш доступ
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const aiResponseText = chatCompletion.choices[0].message.content;

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