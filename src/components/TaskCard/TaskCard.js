"use client"
import React, { useEffect } from 'react'


const TaskCard = ({ task, deleteTaskParent }) => {
    const calculateDate = () => {
        const addDate = new Date(task.addDate);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - addDate);
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffMinutes < 60) {
            return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
        }
    };

    async function deleteTask(taskid) {
        deleteTaskParent(taskid);
    }

    return (
        <div>
            <div className='flex flex-wrap justify-center '>
                <div
                    className={`block rounded-lg text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white m-2 w-2/3 ${task.status == "completed" ? "bg-green-600" : "bg-slate-700"} `}>
                    <div
                        className="relative text-center border-b-2 border-neutral-100 px-3 py-2 dark:border-white/10">
                        {task?.title}
                        <span className='absolute top-0 right-0 p-1 m-1'>
                            <button onClick={() => deleteTask(task._id)}
                                type="button" className="bg-slate-600 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Close menu</span>

                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    </div>
                    <div className="p-3">

                        <p className="mb-4 text-base ">
                            {task?.content}
                        </p>

                    </div>
                    <div
                        className="border-t-2 border-neutral-100 px-6 py-3 text-surface/75 dark:border-white/10 dark:text-neutral-300 flex justify-between">
                        <div className=''>
                            Status: {task?.status}
                        </div>
                        <div className=''>
                            {calculateDate()}
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default TaskCard