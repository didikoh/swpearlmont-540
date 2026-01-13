#!/usr/bin/env bash
set -e

LOCAL_DIR="dist"
REMOTE_HOST="vrserver"
REMOTE_DIR="/home/vrtechmy/goprop.ai/preview/pearlmont"

echo "Building..."
npm run build

echo "Uploading with lftp (SFTP mirror)..."
lftp sftp://$REMOTE_HOST <<EOF
set sftp:auto-confirm yes
put "$LOCAL_DIR/index.html" -o "$REMOTE_DIR/index.html"  
mirror -Rnev --transfer-all "$LOCAL_DIR/assets" "$REMOTE_DIR/assets"
mirror -Rnev --ignore-time --exclude-glob "assets/" "$LOCAL_DIR" "$REMOTE_DIR"
bye
EOF

echo "Fixing permissions via SSH..."
ssh $REMOTE_HOST "find $REMOTE_DIR -type d -exec chmod 755 {} \; && find $REMOTE_DIR -type f -exec chmod 644 {} \;"

echo "Done ✅"
    