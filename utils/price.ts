export const getEthereumPrice = async (): Promise<number> => {
  try {
    const data = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const response = await data.json();

    if (response?.ethereum?.usd) {
      return parseFloat(response.ethereum.usd);
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
