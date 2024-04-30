import { NextResponse } from "next/server";

export function GET(req, {params})
{
    // /api/todos/[userid]/posts/[postid]
    const {userid, postid} = params;
    console.log("User id", userid);
    console.log("Post id", postid);
    return NextResponse.json(params);
}