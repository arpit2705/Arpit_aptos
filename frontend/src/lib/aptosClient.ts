import { AptosClient } from "aptos";
import { NODE_URL } from "@/constants";

// Get API key from environment variables (optional)
// API keys help avoid rate limits - get one at https://geomi.dev/docs/start
const APTOS_API_KEY = process.env.NEXT_PUBLIC_APTOS_API_KEY;

/**
 * Creates an AptosClient instance with optional API key support
 * 
 * API keys help avoid rate limits. To use an API key:
 * 1. Get an API key from https://geomi.dev/docs/start
 * 2. Add it to your .env.local file: NEXT_PUBLIC_APTOS_API_KEY=your_key_here
 * 
 * The API key will be appended to the node URL as a query parameter.
 */
export function createAptosClient(): AptosClient {
  // Build the node URL with optional API key
  let nodeUrl = NODE_URL;
  
  if (APTOS_API_KEY) {
    // Append API key as query parameter (most Aptos API providers support this)
    const separator = nodeUrl.includes('?') ? '&' : '?';
    nodeUrl = `${NODE_URL}${separator}api_key=${APTOS_API_KEY}`;
  }
  
  return new AptosClient(nodeUrl);
}

// Export a singleton client instance
export const aptosClient = createAptosClient();

