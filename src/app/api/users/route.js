import { dbConnection } from "@/helper/db";
import { SignupModel } from "@/models/signup";
import { NextResponse } from "next/server";

// dbConnection();

export async function POST(request) {
    const { name, email, password } = await request.json();
    console.log(name, email, password)


    try {
        await dbConnection();
        const user = new SignupModel({
            name,
            email,
            password,
        });
        const createdUser = await user.save();
        return NextResponse.json(user, { status: 201 });
    }
    catch (error) {
        console.log(error);
        return NextResponse({message:"Failed to Create user"});
    }

}

export async function GET(request)
{
    try {
        await dbConnection();
        const user = await SignupModel.find().select("-password");
        return new NextResponse.json(user);

    } catch (error) {
        return new NextResponse.json({
            message:"Failed to get users",
            success:false
        })
    }
}