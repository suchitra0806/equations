import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  // This will only log on the server; the API route will still handle missing keys gracefully.
  // eslint-disable-next-line no-console
  console.warn("ANTHROPIC_API_KEY is not set. /api/explain will return an error.");
}

export const anthropic = new Anthropic({
  apiKey: apiKey ?? "",
});

