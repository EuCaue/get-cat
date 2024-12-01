import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetch("https://meowfacts.herokuapp.com", {
      method: "GET",
      cache: "no-cache",
    });

    const json: { data: [string] } = await data.json();
    const meowFact: string = json.data[0];
    return NextResponse.json({ meowFact });
  } catch (err) {
    return NextResponse.json({}, { status: 400, statusText: String(err) });
  }
}
