import { dbConnection } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SignupModel } from "@/models/signup";

// dbConnection();

// Get all task
export async function GET()
{
    try {
        await dbConnection();
        const tasks = await Task.find();
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json({
            message:"Failed to get task",
            status:400
        })
    }
}

// Create Task
export async function POST(request)
{
    await dbConnection();
    const {title, content,status, userid} = await request.json();

    // fetching logged in user id
    const authToken = request.cookies.get("authToken")?.value;
    const data = jwt.verify(authToken, "PRIVATE_KEY_HERE")
    const user = await SignupModel.findById(data._id).select("-password");
    console.log("User id from POST -- >>>", user._id);  

    try {

        const task = new Task({
            title,
            content,
            status,
            userid:user._id,
        })
        const taskCreated = await task.save()
        console.log("task-------->", task);
        console.log("taskCreated-------->", taskCreated);
        return NextResponse.json(taskCreated, {
            status:201,
        })
    } 
    catch (error) {
        return NextResponse.json({
            message:"Failed to Created Task",
            status:400
        })
    }
}