#!/bin/bash
# Quick deploy script for contract changes

echo "🚀 Quick Contract Change Deployment"
echo "======================================"

# 1. Clear Heroku cache
echo "🧹 Clearing Heroku build cache..."
heroku builds:cache:purge --app trivia-quiz-bot-app --confirm trivia-quiz-bot-app

# 2. Force rebuild
echo "🔨 Creating rebuild commit..."
echo "// Force rebuild $(date)" >> apps/web/src/main.tsx
git add .
git commit -m "🔄 Rebuild for contract change $(date +%Y%m%d_%H%M%S)"

# 3. Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin final-working-system

# 4. Deploy to Heroku
echo "🚀 Deploying to Heroku..."
git push heroku final-working-system:master

echo ""
echo "✅ Deployment complete!"
echo "📋 Next steps:"
echo "   1. Wait for build to finish (~2-3 min)"
echo "   2. Clear browser cache (Ctrl+Shift+R)"
echo "   3. Test the new contract"

