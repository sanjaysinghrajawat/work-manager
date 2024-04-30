"use client";
import { addTask } from '@/services/taskServices';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
    userid: "",
  });

  const handleAddTodo = async (event) => {
    event.preventDefault();

    // adding data to database
    try {
      const result = await addTask(task);
      console.log(result);
      toast.success("Task Added");
    }
    catch (error) {
      console.log(error);
      toast.error("Failed to Add Task");
    }

    console.log("Task from Add Task -->", task);
    setTask({
      title:"",
      content:"",
      status:""
    })
  }

  return (
    <>
      <div className='grid grid-cols-12 m-2'>
        <div className=' p-5 col-span-6 col-start-4 '>
          <div className="mb-3 flex justify-center">

            <img
              src="/task.svg"
              alt=""
              width="50%"
              className='' />
          </div>

          <h1 className='text-2xl font-semibold text-center'>Add Your Task Here</h1>
          <hr className=" border border-gray-700" />

          <form className='mt-3' onSubmit={handleAddTodo}>

            <div>
              {/* Title */}
              <label
                htmlFor="task_title"
                className='block font-sans font-semibold mb-2'>
                Title
              </label>
              <input
                type="text"
                className='w-full p-2.5 rounded-lg text-white border border-gray-400 bg-slate-700'
                id='task_title'
                placeholder='Enter Title...'
                onChange={(e) => {
                  setTask({
                    ...task,
                    title: e.target.value
                  })
                }}
                value={task.title} />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="task_content"
                className='block font-sans font-semibold mb-2 mt-2'>
                Content
              </label>
              <textarea
                type="text"
                className='w-full p-2.5 rounded-lg text-white border border-gray-400 bg-slate-700'
                id='task_content'
                rows={6}
                placeholder='Enter Content here ...'
                onChange={(e) => {
                  setTask({
                    ...task,
                    content: e.target.value
                  })
                }}
                value={task.content} />
            </div>


            {/* Status */}
            <div>
              <label
                htmlFor="task_status"
                className='block font-sans font-semibold mb-2 mt-2'>
                Status
              </label>
              <div>
                <input type="radio"
                  name="status"
                  id="task_pending"
                  className='text-white'
                  onChange={(e) => {
                    setTask({
                      ...task,
                      status: e.target.value
                    })
                  }}
                  value="pending" />
                <label htmlFor="task_pending" className='ms-1'>Pending</label>
              </div>
              <div>
                <input type="radio"
                  name="status"
                  id="task_completed"
                  className='text-white'
                  onChange={(e) => {
                    setTask({
                      ...task,
                      status: e.target.value
                    })
                  }}
                  value="completed" />
                <label htmlFor="task_completed" className='ms-1'>Completed</label>
              </div>
            </div>

            {/* button */}
            <div className='mt-4 flex justify-center'>
              <button className='bg-green-800 p-3 rounded-full w-full me-2'>Add Todo</button>
              <button className='bg-red-800 p-3 rounded-full w-full'>Clear</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTask