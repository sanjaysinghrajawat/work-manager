import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("middleware Executed");

    const authToken = request.cookies.get("authToken")?.value;
    console.log("authToken -- >", authToken);
    if(request.nextUrl.pathname === "/api/login" || request.nextUrl.pathname === "/api/signup" || request.nextUrl.pathname === "/api/users"){
        return;
    }

    // // public URL for not logged in user
    const loggedInUserNotAccessPath = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup";
    if (loggedInUserNotAccessPath) {
        if (authToken) {
            return NextResponse.redirect(new URL("/profile", request.url))
        }
    }
    else {
        if (!authToken) { // secure route

            if(request.nextUrl.pathname.startsWith("/api"))
            {
                return NextResponse.json({
                    message:"Access Denied",
                },{
                    status:401,
                })
            }
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

}

// only below path are executed
export const config = {
    matcher: [
        
        "/login",
        "/signup",
        "/addtask",
        "/showtask",
        "/profile/:path*",
        "/api/:path*"
    ],
}