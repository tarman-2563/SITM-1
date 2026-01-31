const {sendEmail} = require("../utils/email");

const sendLeadConfirmation = (lead, req) => {
  return sendEmail({
    to: lead.email,
    template: "lead-confirmation",
    data: {
      name: lead.firstName,
      program: lead.program
      //applicationUrl: `${req.protocol}://${req.get("host")}/apply`
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

module.exports={
    sendLeadConfirmation,
    sendLeadAdminNotification
}
