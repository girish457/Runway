# Port Management

## Automatic Port Selection

The server now automatically finds an available port if the default port (5000) is already in use. It will try ports in sequence (5001, 5002, etc.) until it finds one that's available.

When the server starts, it will display a message showing which port it's running on:
```
========================================
Server is now running on port 5000
Health check: http://localhost:5000/health
========================================
```
or
```
Port 5000 is already in use, trying 5001...
========================================
Server is now running on port 5001
Health check: http://localhost:5001/health
========================================
```

## Killing Processes on Port 5000

If you need to manually kill processes occupying port 5000, you can use the following command:

```bash
npm run kill-port-5000
```

This command works on Windows, macOS, and Linux.

## How It Works

1. The server attempts to bind to the default port (5000)
2. If that port is in use, it automatically tries the next port (5001)
3. This continues until an available port is found
4. The server then starts on the first available port
5. The port number is displayed in the console with a health check URL

## Nodemon Compatibility

The solution is fully compatible with nodemon and will not crash on restart. The dynamic port assignment works correctly even when nodemon restarts the server. Graceful shutdown handling has been implemented for both normal shutdown and nodemon restarts.

## Environment Variables

You can set a custom starting port using the PORT environment variable:

```bash
PORT=3000 npm start
```

## Health Check Endpoint

A health check endpoint is available at `/health` to verify the server is running properly.

## Troubleshooting

If you're still experiencing port conflicts:
1. Run `npm run kill-port-5000` to kill any processes on port 5000
2. Restart the server
3. Check the console output for the actual port the server is running on