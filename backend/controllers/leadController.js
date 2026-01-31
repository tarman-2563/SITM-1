const {validationResult} = require("express-validator");
const { createLeadService, getLeadByIdService } = require("../services/leadService");

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

const getLeadById=async(req,res)=>{
    try{
        const lead=await getLeadByIdService(req.params.id);
        if(!lead){
            return res.status(404).json({status:"error",message:"Lead not found"});
        }
        const responseData={
            id:lead._id,
            firstName:lead.firstName,
            lastName:lead.lastName,
            email:lead.email,
            phone:lead.phone,
            program:lead.program,
            status:lead.leadStatus
        }
        res.status(200).json({status:"success",data:responseData});
    }
    catch(err){
        res.status(500).json({status:"error",message:err.message});
    }
}

module.exports={
    createLead,
    getLeadById
}