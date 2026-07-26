const mongoose=require("mongoose");
const DB_URL=process.env.MONGO_URI || "mongodb://localhost:27017/clothing-e-commerce";
async function connectToDB() {
    try{
        await mongoose.connect(DB_URL);
        console.log(" ✔️  Connect To DB...");
    }catch(err){
        console.log(" ❌Error Occured While Connecting To DB...");
        console.log("Error: ",err);
    }
    
}
module.exports=connectToDB;