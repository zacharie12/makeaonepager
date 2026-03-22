import { NextRequest, NextResponse } from "next/server";
import { generateOnePagerContent, getCurrentModel, OnePagerInput } from "@/lib/ai";

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
    const model = getCurrentModel();

    return NextResponse.json({ content, model });
  } catch (error) {
    console.error("Generation error:", error);
    const model = getCurrentModel();
    return NextResponse.json(
      { error: `Failed to generate content. Provider: ${model.provider}, Model: ${model.model}. Check your API key.` },
      { status: 500 }
    );
  }
}
