const Lead=require("../models/Lead");
const { sendLeadConfirmation, sendLeadAdminNotification } = require("./emailService")

const createLeadService=async(leadData,req)=>{
    try{
         let lead=await Lead.findOne({email:leadData.email});
         let isExisting=false;
         if(lead){
             lead.firstName=leadData.firstName;
             lead.lastName=leadData.lastName;
             lead.phone=leadData.phone;
             lead.program=leadData.program;
             lead.lastActivity=new Date();
             await lead.addActivity("form_submitted","Updated lead information");
             await lead.save();
             isExisting=true;
         }
         else{
             lead=await Lead.create(leadData);
             await lead.addActivity("form_submitted","Initial lead form submission");
             try{
                await sendLeadConfirmation(lead,req);
                await lead.addActivity("email_sent","Sent lead confirmation email");
                await sendLeadAdminNotification(lead);
             }
             catch(emailError){
                console.error("Email sending failed:",emailError);
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