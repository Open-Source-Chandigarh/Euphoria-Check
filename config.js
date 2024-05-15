require("dotenv").config()
//MongoDB connection for login and signup
const mongoose=require("mongoose")
const connect=mongoose.connect(process.env.Mongo_URL)
connect.then(()=>{
    console.log("connected to DB successfully")
})
.catch(()=>{
    console.log("error connecting to DB")
})

// Custom email validator function
function validateEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const loginSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true
    }
});
const collection=new mongoose.model("users",loginSchema)
module.exports=collection;