const mongoose = require('mongoose');
console.log(process.env.MONGP_DB_URI);
const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connection to database successful");
    }
    catch(error){
        console.log("Error in connecting",error.message);
    }
}

module.exports=connectDB;