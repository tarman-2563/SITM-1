const nodemailer = require("nodemailer");
const logger = require("./logger");

let cachedTransporter;

const createTransporter = () => {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return cachedTransporter;
};


const templates = {
  "lead-confirmation": (data) => ({
    subject: "SITM | Thanks for Your Interest – Next Steps Inside",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <div style="background:#002366; padding:24px; text-align:center;">
            <h1 style="color:#ffffff; margin:0;">SITM</h1>
            <p style="color:#d4af37; margin:6px 0 0;">
              Scholars Institute of Technology & Management
            </p>
          </div>

          <!-- Body -->
          <div style="padding:30px;">
            <h2 style="color:#002366; margin-top:0;">
              Thanks for reaching out, ${data.name}! 🎓
            </h2>

            <p style="font-size:15px; color:#333;">
              We’ve received your interest in the 
              <strong>${data.program}</strong> program at SITM.
            </p>

            <p style="font-size:15px; color:#333;">
              Ready to take the next step? Complete your full application now to secure your spot!
            </p>

            <!-- Application CTA Button -->
            <div style="text-align:center; margin:30px 0;">
              <a href="${data.applicationUrl}" 
                 style="background:#002366; color:#ffffff; padding:16px 32px; text-decoration:none; border-radius:8px; display:inline-block; font-weight:600; font-size:16px; box-shadow:0 4px 12px rgba(0,35,102,0.3);">
                Complete Your Application
              </a>
            </div>

            <p style="font-size:14px; color:#666; text-align:center; margin:20px 0;">
              This will take you through our simple multi-step application process.
            </p>

            <p style="font-size:15px; color:#333;">
              Our admissions team will review your details and contact you shortly.
            </p>

            <!-- Optional CTA can be added later -->

            <p style="font-size:14px; color:#555;">
              If you have any questions, feel free to reply to this email.
            </p>

            <p style="font-size:14px; color:#555; margin-bottom:0;">
              Warm regards,<br/>
              <strong>SITM Admissions Team</strong>
            </p>
          </div>
        </div>
      </div>
    `
  }),

  "lead-admin-notification": (data) => ({
    subject: `New Lead Captured | ${data.name} – ${data.program}`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; padding:24px;">
          
          <h2 style="color:#002366; margin-top:0;">
            New Lead Captured
          </h2>

          <p style="font-size:15px; color:#333;">
            A new prospective student has submitted their details.
          </p>

          <table style="width:100%; border-collapse:collapse; margin-top:16px;">
            <tr>
              <td style="padding:8px; font-weight:bold;">Name:</td>
              <td style="padding:8px;">${data.name}</td>
            </tr>
            <tr style="background:#f9f9f9;">
              <td style="padding:8px; font-weight:bold;">Email:</td>
              <td style="padding:8px;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:bold;">Phone:</td>
              <td style="padding:8px;">${data.phone}</td>
            </tr>
            <tr style="background:#f9f9f9;">
              <td style="padding:8px; font-weight:bold;">Program:</td>
              <td style="padding:8px;">${data.program}</td>
            </tr>
          </table>

          <p style="font-size:14px; color:#555; margin-top:20px;">
            Please follow up with the candidate as soon as possible.
          </p>
        </div>
      </div>
    `
  })
};


const sendEmail = async ({ to, template, data, subject, html, text }) => {
  if (!to) throw new Error("Recipient email is required");

  const transporter = createTransporter();
  const mailOptions = {
    from: `"SITM" <${process.env.SMTP_USER}>`,
    to
  };

  if (template) {
    const templateFn = templates[template];
    if (!templateFn) {
      throw new Error(`Email template "${template}" not found`);
    }
    const compiled = templateFn(data || {});
    mailOptions.subject = compiled.subject;
    mailOptions.html = compiled.html;
  } 
  else {
    if (!subject) throw new Error("Subject is required");
    mailOptions.subject = subject;
    if (html) mailOptions.html = html;
    else if (text) mailOptions.text = text;
    else throw new Error("Email content missing");
  }

  return transporter.sendMail(mailOptions);
}


const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info("Email configuration verified");
    return true;
  } 
  catch (err) {
    logger.error("Email configuration failed", { error: err.message });
    return false;
  }
}

module.exports = {
  sendEmail,
  verifyEmailConfig
};
