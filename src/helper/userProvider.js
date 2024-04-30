"use client"
import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import { toast } from 'react-toastify';
import { currentUser } from '@/services/currentUser';

const UserProvider = ({children}) => {
    const [user, setUser] = useState(undefined);

    useEffect(()=>{
        async function load()
        {
            try {
                const current_user = await currentUser();
                console.log(current_user);
                setUser({...current_user});
            } 
            catch (error) {
                console.log(error);
                // toast.error("error in loading current user");
                setUser(undefined);
            }
        }
        if(!user) load();
    },[]);

  return (
    <>
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
    </>
  )
}

export default UserProvider