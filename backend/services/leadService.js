const Lead=require("../models/Lead");
const { sendLeadConfirmation } = require("./emailService");
const { Parser } = require('json2csv');

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

const getAllLeadsService = async (filters = {}) => {
    try {
        const { page = 1, limit = 10, program, state, search, startDate, endDate } = filters;
        
        const query = {};
        
        if (program) {
            query.program = program;
        }
        
        if (state) {
            query.state = state;
        }
        
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                query.createdAt.$lte = new Date(endDate);
            }
        }
        
        const skip = (page - 1) * limit;
        
        const leads = await Lead.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        
        const total = await Lead.countDocuments(query);
        
        return {
            leads,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                limit: parseInt(limit)
            }
        };
    } catch (err) {
        throw new Error("Error retrieving leads: " + err.message);
    }
}

const exportLeadsCSVService = async (filters = {}) => {
    try {
        const { program, state, search, startDate, endDate } = filters;
        
        const query = {};
        
        if (program) {
            query.program = program;
        }
        
        if (state) {
            query.state = state;
        }
        
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                query.createdAt.$lte = new Date(endDate);
            }
        }
        
        const leads = await Lead.find(query).sort({ createdAt: -1 });
        
        const fields = [
            { label: 'First Name', value: 'firstName' },
            { label: 'Last Name', value: 'lastName' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Program', value: 'program' },
            { label: 'State', value: 'state' },
            { label: '10th Percentage', value: 'tenthPercentage' },
            { label: '12th Info', value: 'twelfthInfo' },
            { label: 'Status', value: 'leadStatus' },
            { label: 'Submitted Date', value: 'createdAt' },
            { label: 'Last Activity', value: 'lastActivity' }
        ];
        
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(leads);
        
        return csv;
    } catch (err) {
        throw new Error("Error exporting leads to CSV: " + err.message);
    }
}

module.exports={
    createLeadService,
    getLeadByIdService,
    getAllLeadsService,
    exportLeadsCSVService
}