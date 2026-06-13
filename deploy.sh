#!/bin/bash
set -e

SERVER_IP=$(hostname -I | awk '{print $1}')

echo "🔨 Building and starting Lyhor Portfolio..."
docker compose up -d --build

echo ""
echo "✅ Portfolio is running!"
echo "   Local:   http://localhost:629"
echo "   Network: http://${SERVER_IP}:629"
echo ""
echo "   Logs:    docker compose logs -f"
echo "   Stop:    docker compose down"
