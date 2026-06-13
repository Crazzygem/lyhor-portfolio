#!/bin/bash
set -e

# Detect server IP for OG link previews
SERVER_IP=$(hostname -I | awk '{print $1}')
export SITE_URL="http://${SERVER_IP}:629"

echo "🔨 Building and starting Lyhor Portfolio..."
echo "   Site URL: ${SITE_URL}"
docker compose up -d --build

echo ""
echo "✅ Portfolio is running!"
echo "   Local:   http://localhost:629"
echo "   Network: http://${SERVER_IP}:629"
echo ""
echo "   Logs:    docker compose logs -f"
echo "   Stop:    docker compose down"
