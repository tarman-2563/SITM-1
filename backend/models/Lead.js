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
        required:false,
        sparse:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email address"]
    },
    phone:{
        type:String,
        required:[true,"Phone number is required"],
        match:[/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"]
    },
    program:{
        type:String,
        required:[true,"Program of interest is required"],
        enum:["CSE","ECE","EEE","ME","CE","BCA","BBA","DATA_SCIENCE"]
    },
    state:{
        type:String,
        required:[true,"State is required"],
        trim:true
    },
    tenthPercentage:{
        type:Number,
        required:[true,"10th percentage is required"],
        min:[0,"Percentage cannot be less than 0"],
        max:[100,"Percentage cannot exceed 100"]
    },
    twelfthInfo:{
        type:String,
        required:[true,"12th information is required"],
        trim:true
    },
    leadStatus:{
        type:String,
        enum:["captured","contacted","application_started","application_completed","converted","lost"],
        default:"captured"
    },
    lastActivity:{
        type:Date,
        default:Date.now
    },
    activities:[{
        type:{
            type:String,
            enum:['form_submitted', 'email_opened', 'email_clicked', 'email_sent', 'application_started', 'application_completed', 'contacted']
        },
        timestamp:{
            type:Date,
            default:Date.now
       },
       details:String
    }]
},{
    timestamps:true
})


leadSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`;
})

leadSchema.methods.addActivity=function(type,details=""){
    this.activities.push({
        type,
        details,
        timestamp:Date.now()
    });
    this.lastActivity=Date.now();
    return this.save();
}

module.exports=mongoose.model("Lead",leadSchema);