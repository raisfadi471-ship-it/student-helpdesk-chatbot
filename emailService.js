const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendRegistrationEmail(studentName, studentEmail, courseName, studentPhone) {
  const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .success-icon { font-size: 50px; margin-bottom: 10px; }
    .course-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; border-radius: 5px; }
    .details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="success-icon">✅</div>
      <h1>Registration Confirmed!</h1>
    </div>
    <div class="content">
      <h2>Hello ${studentName}! 👋</h2>
      <p>Thank you for registering with Student Helpdesk! We're excited to have you join us.</p>
      
      <div class="course-box">
        <h3>📚 Course Details</h3>
        <p><strong>Course:</strong> ${courseName}</p>
        <p><strong>Status:</strong> Registration Pending</p>
      </div>

      <div class="details">
        <h3>📋 Your Information</h3>
        <p><strong>Name:</strong> ${studentName}</p>
        <p><strong>Email:</strong> ${studentEmail}</p>
        <p><strong>Phone:</strong> ${studentPhone || 'Not provided'}</p>
      </div>

      <h3>🎯 Next Steps:</h3>
      <ol>
        <li><strong>Check your email</strong> - Our team will send payment details within 24 hours</li>
        <li><strong>Complete payment</strong> - Follow the instructions in the payment email</li>
        <li><strong>Get confirmation</strong> - Once payment is received, you'll get enrollment confirmation</li>
        <li><strong>Start learning!</strong> - We'll send you course access details</li>
      </ol>

      <p style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">
        <strong>⚡ Important:</strong> Our team will contact you within 24 hours. Please keep your phone handy!
      </p>

      <div style="text-align: center;">
        <a href="mailto:admin@studenthelpdesk.com" class="button">Contact Support</a>
      </div>
    </div>

    <div class="footer">
      <p>Student Helpdesk | AI-Powered Learning Platform</p>
      <p>Need help? Reply to this email or call us at +91-XXXXXXXXXX</p>
      <p>&copy; 2026 Student Helpdesk. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: studentEmail,
    subject: `✅ Registration Confirmed - ${courseName} Course`,
    html: emailHTML,
    text: `Hello ${studentName}!\n\nYour registration for ${courseName} course has been confirmed!\n\nYour Details:\n- Name: ${studentName}\n- Email: ${studentEmail}\n- Phone: ${studentPhone || 'Not provided'}\n- Course: ${courseName}\n\nNext Steps:\n1. Check your email for payment details (within 24 hours)\n2. Complete payment to confirm enrollment\n3. Our team will contact you at ${studentPhone || studentEmail}\n\nThank you!\nStudent Helpdesk Team`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendRegistrationEmail };
