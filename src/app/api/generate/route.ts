import { NextRequest, NextResponse } from "next/server";
import { generateOnePagerContent, OnePagerInput } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const body: OnePagerInput = await request.json();

    if (!body.companyName || !body.description || !body.type) {
      return NextResponse.json(
        { error: "Missing required fields: companyName, description, type" },
        { status: 400 }
      );
    }

    const content = await generateOnePagerContent(body);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please check your OpenAI API key." },
      { status: 500 }
    );
  }
}
