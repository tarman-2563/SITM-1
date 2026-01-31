const {validationResult} = require("express-validator");
const { createLeadService } = require("../services/leads.service");

const createLead=async(req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({status:"error",message:"Validation failed",errors:errors.array()});
        }
        const leadData=req.body;
        const result=await createLeadService(leadData,req);
        res.status(201).json({
            status:"success",
            message:result.isExisting ? "Information updated successfully" : "Thank you for your interest! Please check your email for further details.",
            data:{
                leadId:result.lead._id,
                name:result.lead.fullName,
                email:result.lead.email,
                program:result.lead.program,
                isExisting:result.isExisting || false
            }
        })
    }
    catch(err){
        console.log("Error creating lead:",err);
        res.status(500).json({message:err.message});
    }
}

module.exports={
    createLead
}