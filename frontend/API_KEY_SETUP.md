# API Key Setup Guide

## Why API Keys?

To avoid rate limit errors (HTTP 429), you should use an Aptos API key. Without an API key, your application is limited to 40,000 compute units per 300 seconds per IP address.

## Getting an API Key

1. Visit [https://geomi.dev/docs/start](https://geomi.dev/docs/start)
2. Sign up for an account
3. Create an API key
4. Copy your API key

## Setting Up the API Key

1. Create a `.env.local` file in the `frontend` directory (if it doesn't exist)
2. Add your API key:

```
NEXT_PUBLIC_APTOS_API_KEY=your_api_key_here
```

3. Restart your development server:

```bash
npm run dev
```

## Important Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file should already be in `.gitignore`
- API keys are public (NEXT_PUBLIC_ prefix) because they're used in the browser
- However, they're scoped to your application and can be restricted

## Verifying It Works

After adding your API key and restarting the server, check the browser console. You should no longer see 429 rate limit errors.

