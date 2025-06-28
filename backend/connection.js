const mongoose = require("mongoose")

connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log(`MongoDB Connected Successfully`);
}).catch((err)=>{
    console.log(`MongoDB connection failed due to ${err}`);
    
})