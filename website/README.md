# Student Helpdesk Website

A modern, responsive website for tech courses with integrated Kommunicate AI chatbot.

## Features

✅ Responsive design (works on mobile, tablet, desktop)
✅ Modern gradient design with smooth animations
✅ 4 Course cards: Web Development, Networking, AI Chatbot, Cybersecurity
✅ Kommunicate chatbot integration ready
✅ Click-to-chat functionality on course cards
✅ Professional UI with purple gradient theme

## Setup Instructions

### Step 1: Get Your Kommunicate App ID

1. Go to your Kommunicate dashboard: https://dashboard.kommunicate.io
2. Click on "Settings" → "Install"
3. You'll see your App ID (looks like: `1a2b3c4d5e6f7g8h9i0j`)
4. Copy this App ID

### Step 2: Add Your App ID to the Website

1. Open `index.html` file
2. Find line 208 where it says: `"appId": "YOUR_APP_ID"`
3. Replace `YOUR_APP_ID` with your actual Kommunicate App ID
4. Save the file

Example:
```javascript
"appId": "1a2b3c4d5e6f7g8h9i0j", // Your actual App ID here
```

### Step 3: Test the Website

**Option A: Open Directly**
- Right-click `index.html` → Open with → Your browser (Chrome, Firefox, etc.)
- The website will open locally

**Option B: Use Live Server (Recommended)**
- If you have VS Code:
  1. Install "Live Server" extension
  2. Right-click `index.html` → "Open with Live Server"
  3. Website opens with auto-reload on changes

### Step 4: Test the Chatbot

1. Website loads with chatbot widget in bottom-right corner
2. Click the chat icon or "Chat with AI Assistant" button
3. Try:
   - "Hi"
   - "Tell me about Web Development"
   - "I want to register for Cybersecurity"
4. Your Dialogflow chatbot should respond!

## File Structure

```
website/
├── index.html          # Main HTML file
├── style.css          # Styling and animations
└── README.md          # This file
```

## Features Explained

### Course Cards
Each course card has:
- Course icon and name
- Duration
- Description
- Highlights list
- "Learn More" button that opens chat with pre-filled question

### Chat Integration
- Click any "Learn More" button → Opens chat with course question
- Chat widget appears in bottom-right corner
- Fully integrated with your Dialogflow bot via Kommunicate

### Responsive Design
- Works on all screen sizes
- Mobile-friendly navigation
- Optimized course grid layout

## Customization

### Change Colors
Edit `style.css`:
- Main gradient: Line 31 (`#667eea` and `#764ba2`)
- Buttons: Lines 93-115

### Add More Courses
Edit `index.html`:
- Copy a course card div (lines 44-64)
- Paste and modify course details
- Update icon, title, description, highlights

### Change Email
Edit `index.html` line 158:
```html
<a href="mailto:YOUR_EMAIL@gmail.com" class="btn btn-secondary">
```

## Deployment Options

### Option 1: GitHub Pages (Free)
1. Create GitHub account
2. Create new repository
3. Upload website files
4. Enable GitHub Pages in settings
5. Get free URL: `https://yourusername.github.io/repo-name`

### Option 2: Netlify (Free)
1. Go to: https://www.netlify.com
2. Drag and drop your `website` folder
3. Get instant deployment with URL
4. Free SSL certificate included

### Option 3: Local Testing
- Just open `index.html` in browser
- Perfect for testing and demo
- No deployment needed

## Troubleshooting

**Chat widget not appearing:**
- Check if you replaced YOUR_APP_ID in index.html
- Open browser console (F12) for errors
- Verify internet connection (widget loads from Kommunicate servers)

**Chatbot not responding:**
- Check Kommunicate dashboard → Dialogflow is connected
- Test in Kommunicate dashboard first
- Verify Dialogflow agent is published

**Styling issues:**
- Make sure style.css is in same folder as index.html
- Clear browser cache (Ctrl+F5)
- Try different browser

## Next Steps

1. ✅ Add your Kommunicate App ID
2. ✅ Test locally in browser
3. ✅ Verify chatbot works
4. 📤 Deploy to GitHub Pages or Netlify (optional)
5. 🎉 Share your website URL!

## Support

For issues:
- Check browser console (F12) for errors
- Test Kommunicate dashboard separately
- Verify all files are in same folder
- Check internet connection

Enjoy your AI-powered course website! 🚀
