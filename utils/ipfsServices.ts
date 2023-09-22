import { Tender } from "@/constants/tender";
const url = "/api/ipfs-service";

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
      data: data.result.IpfsHash,
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
  const formData = new FormData();
  formData.set("file", file); // include file name??
  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    return {
      isOk: true,
      data: data.result.IpfsHash,
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
      data: data.result,
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
