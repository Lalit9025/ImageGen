
import { NextRequest, NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';

interface RecraftImage {
  url: string;
}

interface RecraftV3Output {
  images: RecraftImage[];
}

export async function POST(req: NextRequest) {
  try {
    const { prompts } = await req.json();

    if (!prompts || !Array.isArray(prompts) || prompts.length === 0) {
      return NextResponse.json(
        { error: 'Invalid input: prompts must be a non-empty array' },
        { status: 400 }
      );
    }

    fal.config({
      credentials: process.env.FALAI_API_KEY!,
    });

    const resultPromises = prompts.map(async (prompt: string) => {
        //@ts-ignore
      const result = await fal.subscribe<RecraftV3Output>("fal-ai/recraft-v3", {
        input: {
          prompt,
        }
      });

      if (!result.data?.images || !Array.isArray(result.data.images)) {
        throw new Error(`Invalid response structure for prompt: "${prompt}"`);
      }
     //@ts-ignore
      return result.data.images.map((image) => ({
        url: image.url
      }));
    });

    const results = await Promise.all(resultPromises);
    const allImages = results.flat();

    return NextResponse.json({ images: allImages });

  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}