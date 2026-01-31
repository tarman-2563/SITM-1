const mongoose=require("mongoose");

const leadSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        trim:true,
        maxLength:[20,"First name cannot exceed 20 characters"]
    },
    lastName:{
        type:String,
        required:[true,"Last name is required"],
        trim:true,
        maxLength:[20,"Last name cannot exceed 20 characters"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email address"]
    },
    phone:{
        type:String,
        required:[true,"Phone number is required"],
        match:[/^\+?[1-9]\d{1,14}$/,"Please enter a valid phone number"]
    },
    program:{
        type:String,
        required:[true,"Program of interest is required"],
        enum:["CSE","ECE","ME","CE","BCA","BBA"]
    }
},{
    timestamps:true
})

leadSchema.index({email:1});
leadSchema.index({phone:1});

leadSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`;
})

module.exports=mongoose.model("Lead",leadSchema);