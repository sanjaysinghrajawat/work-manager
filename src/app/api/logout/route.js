import { NextResponse } from "next/server";

export async function POST(request) {
    const response = NextResponse.json({
        message: "Logged Out !!!"
    });

    response.cookies.set("authToken", "", {
        expires: new Date(0),
    })

    // console.log("Response -->>>", response);
    return response;
}