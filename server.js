const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { sendRegistrationEmail } = require('./emailService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get('/', (req, res) => {
  res.send({
    status: 'success',
    message: 'Student Helpdesk Chatbot Webhook is running!',
    timestamp: new Date().toISOString()
  });
});

app.post('/webhook', async (req, res) => {
  try {
    console.log('Received webhook request:', JSON.stringify(req.body, null, 2));

    const queryResult = req.body.queryResult;
    const userMessage = queryResult.queryText;
    const botReply = queryResult.fulfillmentText;
    const intentName = queryResult.intent.displayName;
    const parameters = queryResult.parameters;
    
    const originalRequest = req.body.originalDetectIntentRequest;
    let platform = 'Unknown';
    
    if (originalRequest && originalRequest.source) {
      platform = originalRequest.source;
    }

    const conversationData = {
      student_message: userMessage,
      bot_reply: botReply,
      intent_name: intentName,
      platform: platform,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('conversations')
      .insert([conversationData]);

    if (error) {
      console.error('⚠️ Conversation logging failed:', error);
    } else {
      console.log('✅ Conversation saved successfully:', data);
    }

    if (intentName === 'RegisterCourseIntent' && parameters) {
      const studentName = parameters['student-name'];
      const studentEmail = parameters['student-email'];
      const studentPhone = parameters['student-phone'] || '';
      const courseName = parameters['course-name'];

      if (studentName && studentEmail && courseName) {
        const registrationData = {
          student_name: studentName,
          student_email: studentEmail,
          student_phone: studentPhone,
          course_name: courseName,
          status: 'pending'
        };

        const { data: regData, error: regError } = await supabase
          .from('student_registrations')
          .insert([registrationData]);

        if (regError) {
          console.error('Registration error:', regError);
          return res.json({
            fulfillmentText: `Thank you ${studentName}! We received your details but encountered an error. Please contact admin@studenthelpdesk.com`
          });
        }

        console.log('Registration saved successfully:', regData);

        const emailResult = await sendRegistrationEmail(studentName, studentEmail, courseName, studentPhone);
        
        if (emailResult.success) {
          console.log('✅ Confirmation email sent to:', studentEmail);
        } else {
          console.error('⚠️ Email sending failed, but registration saved');
        }

        return res.json({
          fulfillmentText: `✅ Registration Successful!\n\nHello ${studentName}!\n\nYour registration for ${courseName} course has been submitted.\n\n📧 Confirmation email sent to: ${studentEmail}\n📞 We'll contact you at: ${studentPhone || 'Not provided'}\n\nNext steps:\n1️⃣ Check your email for payment details\n2️⃣ Our team will contact you within 24 hours\n3️⃣ Complete the payment to confirm enrollment\n\nThank you! 🎓`
        });
      }
    }

    res.json({
      fulfillmentText: botReply
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      fulfillmentText: 'Sorry, something went wrong. Please try again.',
      error: error.message
    });
  }
});

app.get('/conversations', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      throw error;
    }

    res.json({
      status: 'success',
      count: data.length,
      conversations: data
    });

  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

app.get('/analytics', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('intent_name, platform, created_at');

    if (error) {
      throw error;
    }

    const intentStats = {};
    const platformStats = {};

    data.forEach(conv => {
      intentStats[conv.intent_name] = (intentStats[conv.intent_name] || 0) + 1;
      platformStats[conv.platform] = (platformStats[conv.platform] || 0) + 1;
    });

    res.json({
      status: 'success',
      total_conversations: data.length,
      intent_statistics: intentStats,
      platform_statistics: platformStats
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

app.get('/registrations', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('student_registrations')
      .select('*')
      .order('registration_date', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({
      status: 'success',
      count: data.length,
      registrations: data
    });

  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Student Helpdesk Chatbot Webhook running on port ${PORT}`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/webhook`);
  console.log(`💾 Supabase connected: ${process.env.SUPABASE_URL ? 'Yes' : 'No'}`);
});
