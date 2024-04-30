import { httpAxios } from "@/helper/httpAxios";

export async function currentUser() {
    const result = await httpAxios
        .get("/api/currentuser")
        .then(response => response.data);
    return result;
}