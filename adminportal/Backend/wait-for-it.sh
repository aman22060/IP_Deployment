#!/bin/sh

# wait-for-it.sh: Wait until a TCP host:port is available

HOST="$1"
PORT="$2"
shift 2

echo "Waiting for $HOST:$PORT to be ready..."

while ! nc -z "$HOST" "$PORT"; do
  sleep 1
done

echo "$HOST:$PORT is available. Starting app..."
exec "$@"
