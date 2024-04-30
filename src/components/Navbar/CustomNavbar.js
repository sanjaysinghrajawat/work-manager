"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import UserContext from '@/helper/userContext'
import { logout } from '@/services/logout'
import { toast } from 'react-toastify'

const CustomNavbar = () => {
    const navigate = useRouter();
    const context = useContext(UserContext);

    console.log("from navbar -- >", context.user);

    async function doLogout()
    {
        try {
            const result = await logout();
            console.log("result navbar--->>>", result);
            context.setUser(undefined);
            navigate.push("/");

        } catch (error) {
            console.log(error);
            // toast.error("Logout Error");
        }
    }

    return (
        <>
            <nav className='bg-blue-500 h-16 py-2 px-3 flex justify-between items-center'>
                <div className='brand text-2xl font-semibold font-sans ps-10'>
                    Work Managar
                </div>
                <div className=''>
                    <ul className='flex space-x-5'>
                        <li className='transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110  duration-300'>
                            <Link href="/">Home</Link>
                        </li>

                        {context.user && (
                            <>
                                <li>
                                    <Link href="/addtask">Add Task</Link>
                                </li>
                                <li>
                                    <Link href="/show-task">Show Task</Link>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
                <div className='flex space-x-5'>
                    {!context.user && (
                        <>
                            <button className='bg-orange-500 px-4 py-1 rounded-full'
                                onClick={() => { navigate.push("/login") }}>Login</button>
                            <button className='bg-purple-500 px-4 py-1 rounded-full'
                                onClick={() => { navigate.push("/signup") }}>Sign up</button>
                        </>
                    )}
                    {context.user && (
                        <>
                            <button className='bg-orange-500 px-4 py-1 rounded-full'
                                onClick={() => { }}>{context.user.name}</button>
                            <button className='bg-purple-500 px-4 py-1 rounded-full'
                                onClick={doLogout}>Logout</button>
                        </>
                    )}
                </div>
            </nav>
        </>
    )
}

export default CustomNavbar