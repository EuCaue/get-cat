import { NextResponse } from "next/server";

async function parseURI(blob: Blob) {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:${blob.type};base64,${base64}`;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function GET() {
  try {
    const data = await fetch(`https://cataas.com/cat`, {
      method: "GET",
      cache: "no-cache",
    });

    const imageBlob = await data.blob();
    const imageBase64 = await parseURI(imageBlob);

    return NextResponse.json({ imageURL: imageBase64 }, { status: 200 });
  } catch (err) {
    return NextResponse.json({}, { status: 400, statusText: String(err) });
  }
}
