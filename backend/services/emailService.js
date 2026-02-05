const {sendEmail} = require("../utils/email");

const sendLeadConfirmation = (lead, req) => {
  // Use frontend URL from environment or fallback to request host
  const frontendUrl = process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
  const applicationUrl = `${frontendUrl}/application/${lead._id}`;
  
  console.log("Generating application URL:", applicationUrl);
  
  return sendEmail({
    to: lead.email,
    template: "lead-confirmation",
    data: {
      name: lead.firstName,
      program: lead.program,
      applicationUrl: applicationUrl
    }
  });
};

const sendPasswordResetEmail = (email, name, resetUrl) => {
  return sendEmail({
    to: email,
    subject: "Password Reset Request - SITM",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B1538, #1E3A8A); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SITM</h1>
          <p style="color: #F6E294; margin: 10px 0 0 0;">Scholars Institute of Technology & Management</p>
        </div>
        
        <div style="padding: 40px 30px; background: white;">
          <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Hello ${name},
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            We received a request to reset your password for your SITM account. Click the button below to reset your password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: #8B1538; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          
          <p style="color: #8B1538; word-break: break-all; margin-bottom: 30px;">
            ${resetUrl}
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 30px 0;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              <strong>Security Note:</strong> This link will expire in 10 minutes for security reasons. If you didn't request this password reset, please ignore this email.
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            SITM Support Team
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #999; margin: 0; font-size: 12px;">
            © 2024 Scholars Institute of Technology & Management. All rights reserved.
          </p>
        </div>
      </div>
    `
  });
};

// Removed all other email functions - keeping only lead confirmation

module.exports={
    sendLeadConfirmation,
    sendPasswordResetEmail
}
