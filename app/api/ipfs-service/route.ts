import pinataSDK from "@pinata/sdk";
import { NextResponse } from "next/server";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const result = await pinata.pinJSONToIPFS(data);
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error uploading to IPFS" },
      { status: 500 }
    );
  }
}
