import { dbConnection } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

// dbConnection();

// Get task
export async function GET(request, {params})
{
    const {taskid} = params;
    try {
        await dbConnection();
        const task = await Task.findById(taskid);
        return NextResponse.json(task,{status:201});
    } catch (error) {
        return NextResponse.json({
            message:"failed to get task",
            status:400
        })
    }
}


export async function PUT(request, {params})
{
    try {
        await dbConnection();
        const {taskid} = params;
        const {title, content, status} = await request.json();
        let task = await Task.findById(taskid);
        console.log("Printing", taskid, title, content, status, task);
        task.title = title;
        task.content = content;
        task.status = status;
        const updatedTask = await task.save();
        return new NextResponse(updatedTask, {status:201})
    } 
    catch (error) {
        console.log(error)
        return new NextResponse.json({
            message:"fail to update task",
        },{
            status:400
        })
    }
}

export async function DELETE(request, {params})
{
    try {
        await dbConnection();
        const {taskid} = params;
        await Task.deleteOne({
            _id:taskid
        });

        return new NextResponse("Task Delete", {status:201})
    } 
    catch (error) {
        console.log(error)
        return new NextResponse.json({
            message:"fail to delete task",
        },{
            status:400
        })
    }
}
