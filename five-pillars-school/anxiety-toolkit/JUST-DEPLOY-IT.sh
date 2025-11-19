#!/bin/bash
# JUST DEPLOY WHAT WORKS - STOP REBUILDING

echo "========================================="
echo "DEPLOYING THE ANATOMICALLY CORRECT VERSION"
echo "========================================="
echo ""
echo "No rebuilding. No fixing. No state tracking."
echo "Just deploying Mike's working files."
echo ""

# Go to the course directory
cd /Users/mike/github/rps-digital-wellness-platform/github-deployment/anxiety-toolkit

echo "✅ Files that work:"
echo "  - lesson-1-1-ANATOMICALLY-CORRECT.html (hearts in chests!)"
echo "  - images/full-body-image.jpg (your blue body)"
echo "  - images/upper-body-image.jpg (your upper body)"
echo ""

# Deploy to VPS
echo "Deploying to VPS..."
scp lesson-1-1-ANATOMICALLY-CORRECT.html root@46.202.88.248:/var/www/courses/anxiety-toolkit/
scp -r images root@46.202.88.248:/var/www/courses/anxiety-toolkit/

echo ""
echo "✅ DEPLOYED!"
echo ""
echo "View at: https://realpsychiatricservices.com/courses/anxiety-toolkit/lesson-1-1-ANATOMICALLY-CORRECT.html"
echo ""
echo "ANATOMY CHECK:"
echo "  ❤️ Heart in chest? YES"
echo "  🦋 Stomach in belly? YES"
echo "  ✋ Hands on arms? YES"
echo "  🦵 Two separate legs? YES"
echo ""
echo "Done. No more rebuilding. It works."
