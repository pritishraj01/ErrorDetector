import mongoose from "mongoose";

const promptSchema= new mongoose.Schema({
    prompt:{
        type:String,
        required:true
    },
    response:{
        type:Object,
        required:true
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    }
},{timestamps:true})

let Prompt= mongoose.model("Prompt",promptSchema)

export default Prompt