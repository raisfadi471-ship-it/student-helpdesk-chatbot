-- =====================================================
-- Student Helpdesk Chatbot - Supabase Database Schema
-- =====================================================

-- Create conversations table to store all chatbot interactions
CREATE TABLE conversations (
  id BIGSERIAL PRIMARY KEY,
  student_message TEXT NOT NULL,
  bot_reply TEXT NOT NULL,
  intent_name VARCHAR(255) NOT NULL,
  platform VARCHAR(50) DEFAULT 'Unknown',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for faster sorting and filtering
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);

-- Create index on intent_name for analytics queries
CREATE INDEX idx_conversations_intent_name ON conversations(intent_name);

-- Create index on platform for platform-specific analytics
CREATE INDEX idx_conversations_platform ON conversations(platform);

-- Optional: Create a view for analytics
CREATE VIEW conversation_analytics AS
SELECT 
  intent_name,
  platform,
  COUNT(*) as conversation_count,
  DATE(created_at) as conversation_date
FROM conversations
GROUP BY intent_name, platform, DATE(created_at)
ORDER BY conversation_date DESC;

-- Insert sample data for testing (optional)
INSERT INTO conversations (student_message, bot_reply, intent_name, platform) VALUES
('What is web development?', 'Web Development is a course that teaches you HTML, CSS, JavaScript, React, Node.js, and full-stack development. Duration: 12 weeks.', 'WebDevelopmentIntent', 'facebook'),
('Tell me about networking', 'Networking course covers TCP/IP, Routing, Switching, Network Security, and Cisco CCNA certification preparation. Duration: 10 weeks.', 'NetworkingIntent', 'whatsapp'),
('I want to learn AI chatbot', 'AI Chatbot Development teaches you Dialogflow, NLP, Machine Learning basics, and integration with messaging platforms. Duration: 8 weeks.', 'AIChatbotIntent', 'facebook'),
('What is cybersecurity?', 'Cybersecurity course includes Ethical Hacking, Penetration Testing, Network Security, and industry certifications like CEH. Duration: 14 weeks.', 'CybersecurityIntent', 'whatsapp');

-- Display table structure
SELECT 
  column_name, 
  data_type, 
  character_maximum_length,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'conversations'
ORDER BY ordinal_position;
