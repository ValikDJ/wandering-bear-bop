import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.24.1"; // Імпорт для Google Gemini API

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
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" }); // Змінено модель на gemini-1.0-pro

    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 150, // Обмеження довжини відповіді
      },
    });

    const result = await chat.sendMessage(query);
    const response = await result.response;
    const aiResponseText = response.text();

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