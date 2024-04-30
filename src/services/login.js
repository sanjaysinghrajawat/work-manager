import { httpAxios } from "@/helper/httpAxios";

export async function loginService(loginData) {
    const result = await httpAxios
        .post("/api/login", loginData)
        .then(response => response.data);
    return result;
}