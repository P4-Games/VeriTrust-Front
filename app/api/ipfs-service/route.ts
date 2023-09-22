import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import formidable from "formidable";
import pinataSDK from "@pinata/sdk";
import fs from "fs";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

const saveFile = async (filePath: string) => {
  try {
    const stream = fs.createReadStream(filePath);
    const options = {
      pinataMetadata: {
        name: "hola",
      },
    };
    const response = await pinata.pinFileToIPFS(stream, options);
    fs.unlinkSync(filePath);

    return response;
  } catch (error) {
    throw error;
  }
};

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type");

  if (contentType === "application/json") {
    const data = await req.json();
    try {
      const result = await pinata.pinJSONToIPFS(data);
      return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error uploading json to IPFS" },
        { status: 500 }
      );
    }
  } else if (contentType?.startsWith("multipart/form-data")) {
    try {
      const data = await req.formData();
      const file: File | null = data.get("file") as unknown as File;

      if (!file) {
        return NextResponse.json({ success: false });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = `/tmp/${file.name}`;

      // old code

      // const form = formidable();
      // console.log(form);
      // const body = new Body(req);
      // form.parse(req, async function (err, files) {
      //   if (err) {
      //     console.log({ err });
      //     return NextResponse.json(
      //       { message: "Upload Error" },
      //       { status: 500 }
      //     );
      //   }

      //   console.log(typeof files.file, files.file);
      console.log(path);
      const response = await saveFile(path);

      return NextResponse.json({ response }, { status: 201 });
      // });
    } catch (error) {
      return NextResponse.json(
        { message: "Error uploading file to IPFS" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
