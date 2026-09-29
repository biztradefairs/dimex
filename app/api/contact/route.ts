import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Constants
const SITE_NAME = 'TransRussia & SkladTech Expo';
const ADMIN_EMAILS = [
  process.env.ADMIN_EMAIL_1,
  process.env.ADMIN_EMAIL_2
].filter(Boolean);
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@transrussia.com';

// SMTP Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const { formType = 'contact', ...data } = formData;
    
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    // 1. Send to Admin
    await sendAdminEmail(data, formType, timestamp);
    
    // 2. Send Thank You to User
    if (data.email) {
      await sendThankYouEmail(data, formType);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });

  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Send email to admin
async function sendAdminEmail(data: any, formType: string, timestamp: string) {
  const formTitle = formType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const adminHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New ${formTitle} Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .container { background: #fff; border-radius: 10px; border: 1px solid #ddd; overflow: hidden; }
          .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
          .content { padding: 25px; }
          .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #555; margin-bottom: 5px; }
          .value { color: #333; }
          .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New ${formTitle} Submission</h2>
            <p>Time: ${timestamp}</p>
          </div>
          <div class="content">
            ${Object.entries(data)
              .map(([key, value]) => `
                <div class="field">
                  <div class="label">${formatKey(key)}</div>
                  <div class="value">${value || 'Not provided'}</div>
                </div>
              `).join('')}
          </div>
          <div class="footer">
            <p>This is an automated email from ${SITE_NAME} website.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"${SITE_NAME}" <${FROM_EMAIL}>`,
    to: ADMIN_EMAILS.join(', '),
    subject: `NEW: ${formTitle} - ${SITE_NAME} Website`,
    html: adminHtml,
  });
}

// Send thank you email to user
async function sendThankYouEmail(data: any, formType: string) {
  const userName = data.firstName || data.name || 'there';
  
  const thankYouHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - ${SITE_NAME}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f4faff; }
          .container { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .header { background: #1e40af; color: white; padding: 40px 20px; text-align: center; }
          .content { padding: 30px; }
          .footer { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .cta { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: #1e40af; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${userName}!</h1>
            <p>We've received your inquiry</p>
          </div>
          <div class="content">
            <p>Dear ${userName},</p>
            <p>Thank you for contacting <strong>${SITE_NAME}</strong>. Your request has been received and our team will review it shortly.</p>
            
            <div class="cta">
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your submission</li>
                <li>We'll contact you within 1-2 business days</li>
                <li>Check your email for updates</li>
              </ul>
            </div>
            
            <p style="text-align: center;">
              <a href="https://transrussia.com" class="button">Visit Our Website</a>
            </p>
          </div>
          <div class="footer">
            <p><strong>${SITE_NAME}</strong></p>
            <p>17-19 March 2027 | Crocus Expo, Moscow</p>
            <p>Phone: +7-(495)-799-55-85 | Email: transport@ite.group</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"${SITE_NAME}" <${FROM_EMAIL}>`,
    to: data.email,
    subject: `Thank You for Contacting ${SITE_NAME}`,
    html: thankYouHtml,
  });
}

// Helper function to format keys
function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/([a-z])([A-Z])/g, '$1 $2');
}