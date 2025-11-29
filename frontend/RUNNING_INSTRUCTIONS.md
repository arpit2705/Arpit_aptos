# Running the Project

## Development Server

The Next.js development server is running!

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

### If the server isn't running

Start it manually with:
```bash
cd frontend
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server (default port 3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Important Notes

1. **API Key Setup** (Recommended):
   - Create a `.env.local` file in the `frontend` directory
   - Add: `NEXT_PUBLIC_APTOS_API_KEY=your_api_key_here`
   - Get your API key from: https://geomi.dev/docs/start
   - Restart the server after adding the key

2. **Wallet Connection**:
   - The wallet will NOT auto-connect (this prevents errors)
   - Click "Connect Petra" button to connect your wallet
   - Make sure you have the Petra wallet extension installed in your browser

3. **Port**:
   - Default port is 3000
   - If port 3000 is busy, Next.js will automatically use the next available port (3001, 3002, etc.)
   - Check the terminal output for the exact URL

### Troubleshooting

- **Port already in use**: Kill the process using port 3000 or let Next.js use a different port
- **Module errors**: Run `npm install` in the frontend directory
- **Rate limit errors**: Add an API key to `.env.local` (see API_KEY_SETUP.md)

