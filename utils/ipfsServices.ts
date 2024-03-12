import { Tender } from "@/constants/tender";
import { toast } from "react-toastify";

const url = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL;

type IPFSSuccess = {
  isOk: true;
  data: string;
  error: null;
};

type IPFSError = {
  isOk: false;
  data: null;
  error: string;
};

type IPFSResponse = IPFSSuccess | IPFSError;

export const ipfsUploadJson = async (
  formState: Tender
): Promise<IPFSResponse> => {
  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });
    const data = await response.json();
    return {
      isOk: true,
      data: data.response.IpfsHash,
      error: null,
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      isOk: false,
      data: null,
      error: (err as Error).message,
    };
  }
};

export const ipfsUploadFile = async (file: any): Promise<IPFSResponse> => {
  console.log("calling ipfsUploadFile...")
  const formData = new FormData();
  formData.set("file", file);
  try {
    const response = await fetch(`/api/files`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    // toast.promise(response, {
    //   pending: "We are processing your request",
    //   success: "All done, thank you for reaching out!",
    //   error: "Ups, something went wrong try again later!",
    // });
    console.log({ data })
    console.log({ response })

    return {
      isOk: true,
      // data: data.response.IpfsHash,
      data: data.response,
      error: null,
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      isOk: false,
      data: null,
      error: (err as Error).message,
    };
  }
};

export const ipfsGet = async (hash: string): Promise<IPFSResponse> => {
  try {
    const response = await fetch(`${url}/${hash}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    return {
      isOk: true,
      data: data.response,
      error: null,
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      isOk: false,
      data: null,
      error: (err as Error).message,
    };
  }
};
