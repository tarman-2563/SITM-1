const Lead=require("../models/Lead");
const { sendLeadConfirmation } = require("./emailService")

const createLeadService=async(leadData,req)=>{
    try{
         let lead;
         let isExisting=false;
         
         // Only check for existing lead if email is provided
         if(leadData.email){
             lead=await Lead.findOne({email:leadData.email});
         }
         
         if(lead){
             lead.firstName=leadData.firstName;
             lead.lastName=leadData.lastName;
             lead.phone=leadData.phone;
             lead.program=leadData.program;
             lead.state=leadData.state;
             lead.tenthPercentage=leadData.tenthPercentage;
             lead.twelfthInfo=leadData.twelfthInfo;
             if(leadData.email) lead.email=leadData.email;
             lead.lastActivity=new Date();
             await lead.addActivity("form_submitted","Updated lead information");
             await lead.save();
             isExisting=true;
         }
         else{
             lead=await Lead.create(leadData);
             await lead.addActivity("form_submitted","Initial lead form submission");
             
             // Only send email if email address is provided
             if(lead.email){
                 try{
                    console.log("Sending confirmation email to:", lead.email);
                    console.log("Email configuration check:");
                    console.log("- SMTP_HOST:", process.env.SMTP_HOST);
                    console.log("- SMTP_USER:", process.env.SMTP_USER);
                    
                    await sendLeadConfirmation(lead, req);
                    await lead.addActivity("email_sent","Sent lead confirmation email");
                    console.log("Confirmation email sent successfully");
                 }
                 catch(emailError){
                    console.error("Email sending failed:", emailError);
                    console.error("Email error details:", {
                        message: emailError.message,
                        code: emailError.code,
                        response: emailError.response,
                        stack: emailError.stack
                    });
                    // Don't throw the error - lead should still be created even if email fails
                 }
             }
             isExisting=false;
         }
         return {lead,isExisting};
    }
    catch(err){
        throw new Error("Error in creating/updating lead: "+err.message);
    }
}

const getLeadByIdService=async(leadId)=>{
    try{
        const lead=await Lead.findById(leadId);
        if(lead){
            lead.lastActivity=new Date();
            await lead.save();
        }
        return lead;
    }
    catch(err){
        throw new Error("Error retrieving lead by ID: "+err.message);
    }
}

module.exports={
    createLeadService,
    getLeadByIdService
}