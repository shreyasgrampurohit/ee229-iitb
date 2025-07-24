// Use Node.js runtime to allow importing the AI SDKs
export const runtime = 'nodejs';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { question, context } = await request.json();
    
    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    
    // Create the prompt
    const prompt = `You are an AI assistant helping students learn signal processing. 
Context from the current page: ${context}

Student question: ${question}

Please provide a clear, educational response based on the context provided. If the question relates to the context, use it to give specific examples or explanations.`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();
    
    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    // Handle specific errors
    if (error.message?.includes('API_KEY_INVALID')) {
      return NextResponse.json({ 
        answer: 'Please set up your Gemini API key. Go to https://makersuite.google.com/app/apikey to get your free API key.' 
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      answer: 'Sorry, the AI assistant is currently unavailable. Please check your Gemini API configuration.' 
    }, { status: 500 });
  }
}
