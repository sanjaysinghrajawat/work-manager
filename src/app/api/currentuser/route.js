import { dbConnection } from "@/helper/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SignupModel } from "@/models/signup";

export async function GET(request)
{
    await dbConnection();
    const authToken = request.cookies.get("authToken")?.value;
    if(!authToken)
    {
        return NextResponse.json({
            message:"User not logged in",
        })
    }
    const data = jwt.verify(authToken, "PRIVATE_KEY_HERE")
    const user = await SignupModel.findById(data._id).select("-password");
    return NextResponse.json(user);
}