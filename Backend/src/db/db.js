const mongoose=require('mongoose');

function connectDB(){
mongoose.connect("mongodb+srv://aadiix23_db_user:LM1uvCCnQbKEJ15T@cluster0.8dzxfad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log("Mongo DB Error",err);
})
}
module.exports=connectDB;