#!/bin/bash
# DEPLOY COMPLETE MODULE 1 TO VPS

echo "🚀 Deploying Module 1: Understanding Your Anxiety"

# Create directory structure
ssh root@46.202.88.248 "mkdir -p /var/www/anxiety-toolkit/module-1/gamma-presentations"

# Copy all lesson files
scp /Users/mike/github/rps-digital-wellness-platform/github-deployment/anxiety-toolkit/*.html root@46.202.88.248:/var/www/anxiety-toolkit/module-1/
scp /Users/mike/github/rps-digital-wellness-platform/github-deployment/anxiety-toolkit/gamma-presentations/*.html root@46.202.88.248:/var/www/anxiety-toolkit/module-1/gamma-presentations/

# Set permissions
ssh root@46.202.88.248 "chmod -R 755 /var/www/anxiety-toolkit"

echo "✅ Module 1 deployed successfully!"
echo "🌐 Access at: http://46.202.88.248/anxiety-toolkit/module-1/"
