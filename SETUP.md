# Complete Setup Guide - Student Helpdesk Chatbot

## Step 1: Install Node.js and Dependencies

```bash
# Install dependencies
npm install
```

## Step 2: Setup Supabase Database

### 2.1 Create Supabase Account
1. Go to https://supabase.com
2. Sign up for free account
3. Create new project
4. Note your project URL and API key

### 2.2 Create Database Table
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy and paste SQL from `database/supabase-schema.sql`
4. Run the SQL script
5. Verify table created under "Table Editor"

### 2.3 Get API Credentials
1. Go to Project Settings → API
2. Copy **Project URL** (e.g., https://xxxxx.supabase.co)
3. Copy **anon/public key** (starts with eyJ...)

## Step 3: Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env file with your credentials
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

## Step 4: Run the Webhook Server

```bash
# Start server
npm start

# Or use nodemon for development
npm run dev
```

Server will run on http://localhost:3000

## Step 5: Setup ngrok for Public URL

```bash
# Install ngrok from https://ngrok.com
# Run ngrok
ngrok http 3000
```

Copy the HTTPS URL (e.g., https://abcd1234.ngrok.io)

## Step 6: Setup Dialogflow Agent

### 6.1 Create Dialogflow Account
1. Go to https://dialogflow.cloud.google.com
2. Sign in with Google account
3. Create new agent: "StudentHelpdeskBot"

### 6.2 Create Intents
Create these intents with training phrases from `dialogflow/intents-training-phrases.json`:

**Intent 1: WebDevelopmentIntent**
- Training phrases: "What is web development?", "Tell me about web development", etc.
- Response: Copy from intents JSON file

**Intent 2: NetworkingIntent**
- Training phrases: "What is networking?", "Tell me about networking course", etc.
- Response: Copy from intents JSON file

**Intent 3: AIChatbotIntent**
- Training phrases: "What is AI chatbot?", "Tell me about chatbot course", etc.
- Response: Copy from intents JSON file

**Intent 4: CybersecurityIntent**
- Training phrases: "What is cybersecurity?", "Tell me about security course", etc.
- Response: Copy from intents JSON file

**Intent 5: CourseFeeIntent**
- Training phrases: "How much does it cost?", "What is the fee?", etc.
- Response: Copy from intents JSON file

**Intent 6: EnrollmentIntent**
- Training phrases: "How to enroll?", "I want to register", etc.
- Response: Copy from intents JSON file

### 6.3 Configure Webhook
1. Go to Dialogflow → Fulfillment
2. Enable Webhook
3. Enter URL: `https://your-ngrok-url.ngrok.io/webhook`
4. Save

### 6.4 Enable Webhook for Intents
1. Open each intent
2. Scroll to "Fulfillment" section
3. Enable "Webhook call for this intent"
4. Save

## Step 7: Test in Dialogflow Console

1. Use "Try it now" panel in Dialogflow
2. Type: "What is web development?"
3. Check response
4. Verify conversation saved in Supabase

## Step 8: Facebook Messenger Integration

1. Dialogflow → Integrations → Facebook Messenger
2. Create Facebook App at https://developers.facebook.com
3. Create Facebook Page
4. Connect Page to Dialogflow
5. Submit for review (optional for public use)

## Step 9: WhatsApp Integration (Business API)

1. Apply for WhatsApp Business API
2. Use provider like Twilio/MessageBird
3. Configure webhook URL in provider dashboard
4. Connect to Dialogflow using webhook

## Testing Endpoints

```bash
# Test webhook is running
curl http://localhost:3000/

# View saved conversations
curl http://localhost:3000/conversations

# View analytics
curl http://localhost:3000/analytics
```
