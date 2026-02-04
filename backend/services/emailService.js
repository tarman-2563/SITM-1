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

// Removed all other email functions - keeping only lead confirmation

module.exports={
    sendLeadConfirmation
}
