import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { hash: string } }
) {
  const hash = params.hash;
  console.log(`${process.env.PINATA_GATEWAY_URL}/ipfs/${hash}`);
  try {
    const response = await fetch(
      `${process.env.PINATA_GATEWAY_URL}/ipfs/${hash}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let result;
    try {
      result = await response.json();
    } catch (error) {
      throw new Error("Error parsing JSON!");
    }

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
