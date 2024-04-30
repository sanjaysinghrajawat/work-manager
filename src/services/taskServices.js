import { httpAxios } from "@/helper/httpAxios";

export async function addTask(task) {
    const result = await httpAxios
        .post("/api/task", task)
        .then((response) => response.data);
    return result;
}

export async function getTaskofUser(userid) {
    const result = await httpAxios
        .get(`/api/users/${userid}/task`)
        .then((response) => response.data);
    return result;
}

export async function deleteTaskService(taskid) {
    const result = await httpAxios
        .delete(`/api/task/${taskid}`)
        .then((response) => response.data);
    return result;
}