#!/bin/bash

# soPres SDK Sync Script
# This script mirrors the current SDK folder structure to a target destination.

# USAGE: ./scripts/sync-repos.sh /path/to/target/repo

TARGET_DIR=$1

if [ -z "$TARGET_DIR" ]; then
    echo "Usage: ./scripts/sync-repos.sh <target-directory>"
    exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: Target directory does not exist."
    exit 1
fi

echo "🚀 Starting sync to $TARGET_DIR..."

# Define whitelist of files/folders to sync
WHITELIST=(
    ".github"
    ".gitea"
    "boilerplates"
    "docs"
    "packages"
    "scripts"
    "CHANGELOG.md"
    "CODE_OF_CONDUCT.md"
    "CONTRIBUTING.md"
    "Dockerfile"
    "LICENSE"
    "README.md"
    "SECURITY.md"
    "eslint.config.js"
    "jest.config.js"
    "package.json"
    "package-lock.json"
    "tsconfig.json"
    ".dockerignore"
    ".env.example"
    ".gitignore"
    ".husky"
)

# Sync each item in the whitelist
for ITEM in "${WHITELIST[@]}"; do
    if [ -e "$ITEM" ]; then
        echo "📦 Syncing $ITEM..."
        rsync -rtv --delete --exclude 'node_modules' --exclude '.git' "$ITEM" "$TARGET_DIR/"
    else
        echo "⚠️ Warning: $ITEM not found, skipping."
    fi
done

echo "✅ Sync complete!"
echo "Next: Go to $TARGET_DIR, check changes, and commit/push."
