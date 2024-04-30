import { NextResponse } from "next/server";
// import { POST } from "../task/route";
import { SignupModel } from "@/models/signup";
import bcrypt from "bcryptjs"; 
import  jwt  from "jsonwebtoken";
import { dbConnection } from "@/helper/db";

// dbConnection();

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        await dbConnection();
        const userExist = await SignupModel.findOne({ email: email });

        if (userExist) {

            const matchPassword = await bcrypt.compare(password, userExist.password);
            console.log("Match Password --> ", matchPassword);
            if(!matchPassword)
            {
                return NextResponse.json({
                    message:"Password Not Match",
                },{
                    status:400,
                })
            }
            // generate Token
            const token = jwt.sign({
                _id:userExist._id,
                name:userExist.name,
            }, "PRIVATE_KEY_HERE");
            console.log("Token -->", token);

            // set cookie
            const response = NextResponse.json({
                message:"Login Successful",
                user:userExist
            },{
                status:200,
            });
            response.cookies.set("authToken", token, {
                expiresIn:"1d",
                httpOnly:true,
            })
            return response;
        }
        else
        {
            return NextResponse.json({
                message:"User not find",
            },{
                status:401
            })
        }
    }
    catch (error) {
        return NextResponse.json({
            message: error
        }, {
            status: 401,
        })
    }
}