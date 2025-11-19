#!/bin/bash
# Deploy Lesson 1.2 to VPS

echo "🚀 Deploying Lesson 1.2 to VPS..."

# Create directory on VPS
ssh root@46.202.88.248 "mkdir -p /var/www/anxiety-toolkit/module-1/"

# Copy files
scp /Users/mike/github/rps-digital-wellness-platform/github-deployment/anxiety-toolkit/lesson-1-2-anxiety-vs-stress.html root@46.202.88.248:/var/www/anxiety-toolkit/module-1/
scp -r /Users/mike/github/rps-digital-wellness-platform/github-deployment/anxiety-toolkit/gamma-presentations root@46.202.88.248:/var/www/anxiety-toolkit/module-1/

echo "✅ Deployment complete!"
echo "🌐 Access at: http://46.202.88.248/anxiety-toolkit/module-1/lesson-1-2-anxiety-vs-stress.html"
