import { httpAxios } from "@/helper/httpAxios";

export async function logout() {
    const result = await httpAxios
        .post("/api/logout")
        .then(response => response.data);
    return result;
}