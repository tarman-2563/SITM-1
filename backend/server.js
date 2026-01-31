const express=require("express");
const connectDB = require("./config/db");
const leadsRouter = require("./routes/leadRoutes");
const dotenv=require("dotenv").config();

const app=express();
const PORT=process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.get("/api/health",(req,res)=>{
    res.status(200).json({message:"Server is up and running"});
})

app.use("/api/leads",leadsRouter);

app.use((err,req,res,next)=>{
    console.log("Global error:",err);
    res.status(500).json({message:"Internal Server Error"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
