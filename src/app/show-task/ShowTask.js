"use client"
import TaskCard from '@/components/TaskCard/TaskCard';
import UserContext from '@/helper/userContext';
import { deleteTaskService, getTaskofUser } from '@/services/taskServices';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShowTask = () => {

    const context = useContext(UserContext);

    const [tasks, setTasks] = useState([]);

    async function loadTasks(userid) {
        try {
            const tasks_ = await getTaskofUser(userid);
            setTasks([...tasks_]);
            console.log("Task -->>", tasks_);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (context.user) {
            loadTasks(context.user._id);
        }
    }, [context.user]);

    async function deleteTaskParent(taskid)
    {
        try {
            const result = await deleteTaskService(taskid);
            console.log("delete task ->", result);
            toast.success("Task Deleted");
            const newTasks = tasks.filter((item)=> item._id != taskid);
            setTasks(newTasks);
        } catch (error) {
            console.log("delete task error- >", error);
            toast.error("Error...");
        }

    }

    return (
        <>
            <div>
                <h2 className='text-2xl text-end'>Your Task: ({tasks.length})</h2>
                {tasks.map((task) => (
                    <>
                        <TaskCard task={task} key={task._id} deleteTaskParent={deleteTaskParent} />
                    </>
                ))}
            </div>
        </>
    )
}

export default ShowTask