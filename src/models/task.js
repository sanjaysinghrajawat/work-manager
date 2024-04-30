import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    addDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    status:{
        type:String,
        enum:["pending", "completed"],
        default:"pending"
    },
    userid:{
        type:mongoose.ObjectId,
        required:true
    }
  
})

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);