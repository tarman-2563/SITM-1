const Lead=require("../models/Lead");

const createLeadService=async(leadData,req)=>{
    try{
         let lead=await Lead.findOne({email:leadData.email});
         let isExisting=false;
         if(lead){
             lead.firstName=leadData.firstName;
             lead.lastName=leadData.lastName;
             lead.phone=leadData.phone;
             lead.program=leadData.program;
             await lead.save();
             return {lead,isExisting:true};
         }
         else{
             lead=await Lead.create(leadData);
             return {lead,isExisting:false};
         }
    }
    catch(err){
        throw new Error("Error in creating/updating lead: "+err.message);
    }
}

module.exports={
    createLeadService
}