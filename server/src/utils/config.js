const config = {
  network: process.env.NETWORK || "testnet",
  serverAddress:
    process.env.SERVER_ADDRESS ||
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  facilitatorUrl:
    process.env.FACILITATOR_URL || "https://facilitator.stacksx402.com",
  openaiKey: process.env.OPENAI_API_KEY || "",
};

module.exports = config;
