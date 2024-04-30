import { SignupModel } from "@/models/signup";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    const { userid } = params;
    try {
        await SignupModel.deleteOne({
            _id:userid,
        });
        return NextResponse.json({message: "User Deleted"});
    } 
    catch (error) {
        return NextResponse.json({message:"Failed to delete user"});
    }
}

export async function GET(request, { params }) {
    const { userid } = params;
    try {
        const user = await SignupModel.findOne({
            _id:userid,
        });
        return NextResponse.json(user);
    } 
    catch (error) {
        return NextResponse.json({message:"Failed to fetch user"});
    }
}

export async function PUT(request, { params }) {
    const { userid } = params;
    const {name, email, password} = await request.json();

    try {
        const user = await SignupModel.findById(userid)
        user.name = name;
        user.email = email;
        user.password = password;
        const updateUser = await user.save()
        return NextResponse.json(updateUser);
    } 
    catch (error) {
        return NextResponse.json({message:"Failed to update user"});
    }
}