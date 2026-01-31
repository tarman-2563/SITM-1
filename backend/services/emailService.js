const {sendEmail} = require("../utils/email");

const sendLeadConfirmation = (lead, req) => {
  return sendEmail({
    to: lead.email,
    template: "lead-confirmation",
    data: {
      name: lead.firstName,
      program: lead.program
    }
  });
};

const sendLeadAdminNotification = (lead) => {
  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    template: "lead-admin-notification",
    data: {
      name: `${lead.firstName} ${lead.lastName}`,
      email: lead.email,
      phone: lead.phone,
      program: lead.program
    }
  });
};

const sendApplicationConfirmation = (admission) => {
  return sendEmail({
    to: admission.email,
    subject: "SITM | Application Submitted Successfully",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden;">
          <div style="background:#002366; padding:24px; text-align:center;">
            <h1 style="color:#ffffff; margin:0;">SITM</h1>
            <p style="color:#d4af37; margin:6px 0 0;">Scholars Institute of Technology & Management</p>
          </div>
          <div style="padding:30px;">
            <h2 style="color:#002366; margin-top:0;">Application Submitted Successfully!</h2>
            <p style="font-size:15px; color:#333;">Dear ${admission.firstName},</p>
            <p style="font-size:15px; color:#333;">Your application for <strong>${admission.program}</strong> has been submitted successfully.</p>
            <p style="font-size:15px; color:#333;"><strong>Application ID:</strong> ${admission.applicationId}</p>
            <p style="font-size:15px; color:#333;">Our admissions team will review your application and contact you soon.</p>
            <p style="font-size:14px; color:#555; margin-bottom:0;">Best regards,<br/><strong>SITM Admissions Team</strong></p>
          </div>
        </div>
      </div>
    `
  });
};

const sendApplicationConfirmationWithAccount = (admission, activationUrl) => {
  return sendEmail({
    to: admission.email,
    subject: "SITM | Application Submitted - Activate Your Account",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden;">
          <div style="background:#002366; padding:24px; text-align:center;">
            <h1 style="color:#ffffff; margin:0;">SITM</h1>
            <p style="color:#d4af37; margin:6px 0 0;">Scholars Institute of Technology & Management</p>
          </div>
          <div style="padding:30px;">
            <h2 style="color:#002366; margin-top:0;">Application Submitted Successfully!</h2>
            <p style="font-size:15px; color:#333;">Dear ${admission.firstName},</p>
            <p style="font-size:15px; color:#333;">Your application for <strong>${admission.program}</strong> has been submitted successfully.</p>
            <p style="font-size:15px; color:#333;"><strong>Application ID:</strong> ${admission.applicationId}</p>
            <p style="font-size:15px; color:#333;">We've also created a student account for you. Please activate it using the link below:</p>
            <div style="text-align:center; margin:20px 0;">
              <a href="${activationUrl}" style="background:#002366; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px; display:inline-block;">Activate Account</a>
            </div>
            <p style="font-size:14px; color:#555; margin-bottom:0;">Best regards,<br/><strong>SITM Admissions Team</strong></p>
          </div>
        </div>
      </div>
    `
  });
};

const sendApplicationAdminNotification = (admission, leadScore) => {
  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Application Submitted | ${admission.firstName} ${admission.lastName} - ${admission.program}`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; padding:24px;">
          <h2 style="color:#002366; margin-top:0;">New Application Submitted</h2>
          <table style="width:100%; border-collapse:collapse; margin-top:16px;">
            <tr><td style="padding:8px; font-weight:bold;">Name:</td><td style="padding:8px;">${admission.firstName} ${admission.lastName}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${admission.email}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Phone:</td><td style="padding:8px;">${admission.phone}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold;">Program:</td><td style="padding:8px;">${admission.program}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Application ID:</td><td style="padding:8px;">${admission.applicationId}</td></tr>
          </table>
          <p style="font-size:14px; color:#555; margin-top:20px;">Please review the application in the admin panel.</p>
        </div>
      </div>
    `
  });
};

const sendStatusUpdateEmail = (admission) => {
  return sendEmail({
    to: admission.email,
    subject: `SITM | Application Status Update - ${admission.applicationId}`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden;">
          <div style="background:#002366; padding:24px; text-align:center;">
            <h1 style="color:#ffffff; margin:0;">SITM</h1>
            <p style="color:#d4af37; margin:6px 0 0;">Scholars Institute of Technology & Management</p>
          </div>
          <div style="padding:30px;">
            <h2 style="color:#002366; margin-top:0;">Application Status Update</h2>
            <p style="font-size:15px; color:#333;">Dear ${admission.firstName},</p>
            <p style="font-size:15px; color:#333;">Your application status has been updated to: <strong>${admission.status.toUpperCase()}</strong></p>
            <p style="font-size:15px; color:#333;"><strong>Application ID:</strong> ${admission.applicationId}</p>
            ${admission.remarks ? `<p style="font-size:15px; color:#333;"><strong>Remarks:</strong> ${admission.remarks}</p>` : ''}
            <p style="font-size:14px; color:#555; margin-bottom:0;">Best regards,<br/><strong>SITM Admissions Team</strong></p>
          </div>
        </div>
      </div>
    `
  });
};

const sendPasswordResetEmail = (user, resetUrl) => {
  return sendEmail({
    to: user.email,
    subject: "SITM | Password Reset Request",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden;">
          <div style="background:#002366; padding:24px; text-align:center;">
            <h1 style="color:#ffffff; margin:0;">SITM</h1>
            <p style="color:#d4af37; margin:6px 0 0;">Scholars Institute of Technology & Management</p>
          </div>
          <div style="padding:30px;">
            <h2 style="color:#002366; margin-top:0;">Password Reset Request</h2>
            <p style="font-size:15px; color:#333;">Dear ${user.firstName},</p>
            <p style="font-size:15px; color:#333;">You requested a password reset. Click the link below to reset your password:</p>
            <div style="text-align:center; margin:20px 0;">
              <a href="${resetUrl}" style="background:#002366; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px; display:inline-block;">Reset Password</a>
            </div>
            <p style="font-size:14px; color:#666;">This link will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
            <p style="font-size:14px; color:#555; margin-bottom:0;">Best regards,<br/><strong>SITM Team</strong></p>
          </div>
        </div>
      </div>
    `
  });
};

module.exports={
    sendLeadConfirmation,
    sendLeadAdminNotification,
    emailService: {
        sendApplicationConfirmation,
        sendApplicationConfirmationWithAccount,
        sendApplicationAdminNotification,
        sendStatusUpdateEmail,
        sendPasswordResetEmail
    }
}
