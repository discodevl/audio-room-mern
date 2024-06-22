import { StreamClient } from "@stream-io/node-sdk";

const apiKey ="3acane5uzwke"
const apiSecret = "56kr9dwnqmvcpje4c5qqxzmdrhsc45uucjucfw8u3n295nfpfzjqv6rcmctq89yz"

export const client = new StreamClient(apiKey, apiSecret)