import { SignupModel } from "@/models/signup";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import { dbConnection } from "@/helper/db";

// Get all task from particuler user
// /api/users/[userid]/task
export async function GET(request, { params }) {
    try {
        await dbConnection();
        const { userid } = params;
        const tasks = await Task.find({
            userid: userid  // schema : current id
        })
        const user = await SignupModel.findById(userid);
        console.log(user)
        return NextResponse.json(tasks, {
            status:201
        })
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"fail to get task"
        },{
            status:400
        })
    }
}