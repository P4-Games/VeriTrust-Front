import pinataSDK from "@pinata/sdk";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const pinata = new pinataSDK(
    "72b1e97b1284b5343f6d",
    "f59031a535b0d3a5f843c22b47edc7eb2864f2aca359ac55a791c4bbe474c66b"
  );

  const data = await req.json();

  try {
    const result = await pinata.pinJSONToIPFS(data);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: "Error uploading to IPFS" });
  }
}
