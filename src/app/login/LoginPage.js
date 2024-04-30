"use client"
import UserContext from '@/helper/userContext';
import { loginService } from '@/services/login';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useRouter();
    const context = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        if(user.email.trim()==="" || user.email == null)
        {
            toast.warning("Enter Email !!!");
            return;
        }
        if(user.password==="" || user.password == null)
        {
            toast.warning("Enter Password !!!");
            return;
        }

        try {
            const result = await loginService(user);
            console.log(result);
            toast.success(result.message);
            context.setUser(result.user);
            navigate.push("/")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

        
    }
    return (
        <>
            <div className="mt-4  mb-4 sm:mx-auto sm:w-full sm:max-w-md bg-white rounded-lg" >
                <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-black">
                            Login
                        </h2>
                        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                            Or {" "}
                            <a href="#"
                                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                Create a new account
                            </a>
                        </p>
                    </div>

                    <div className="sm:mx-auto sm:w-full sm:max-w-md  mt-4">
                        <div className="py-6 px-4  sm:rounded-lg sm:px-10">
                            <form onSubmit={handleLogin}>
                                <div className="mt-6">
                                    <label for="email" className="block text-sm font-medium leading-5  text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            id="email"
                                            name="email"
                                            placeholder="user@example.com"
                                            type="email"
                                            required=""
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-black "
                                            value={user.email}
                                            onChange={(e) => {
                                                setUser({
                                                    ...user,
                                                    email: e.target.value,
                                                });
                                            }} />

                                        <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label for="password" className="block text-sm font-medium leading-5 text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input id="password" name="password" type="password" required="" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-black"
                                            value={user.password}
                                            onChange={(e) => {
                                                setUser({
                                                    ...user,
                                                    password: e.target.value,
                                                });
                                            }} />
                                    </div>
                                </div>


                                <div className="mt-6">
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                            Login
                                        </button>
                                    </span>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage