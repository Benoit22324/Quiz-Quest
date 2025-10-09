import axios from "axios";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";
import type { UserRepositoryInterface } from "../repositories/UserRepositoryInterface";
import { apiUrl } from "../../../env";
import { repositoryError } from "../../../domain/errors/repositoryError";

class UserRepository implements UserRepositoryInterface {
    async getAllUser(): Promise<RepositoryOutput> {
        try {
            const m = document.cookie.match(/accessToken=([^;]+)/);
            const token = m ? m[1] : null
            const response = await axios.get(`${apiUrl}/user/all`, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                return {
                    data: response.data.data,
                    message: response.data.message,
                    success: true
                }
            }

            return repositoryError(response.data.message)
        } catch(err: any) {
            throw new Error("Error during the fetch of every User");
        }
    }

    async getUser(id: string | null): Promise<RepositoryOutput> {
        try {
            const m = document.cookie.match(/accessToken=([^;]+)/);
            const token = m ? m[1] : null
            const response = await axios.get(`${apiUrl}/user${id ? `/${id}` : ""}`, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                return {
                    data: response.data.data,
                    message: response.data.message,
                    success: true
                }
            }

            return {
                data: null,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of the User");
        }
    }

    async updateUser(username: string, email: string, password: string): Promise<RepositoryOutput> {
        try {
            const m = document.cookie.match(/accessToken=([^;]+)/);
            const token = m ? m[1] : null
            const response = await axios.put(`${apiUrl}/user`, {
                username,
                email,
                password
            }, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (response.status === 201) {
                return {
                    data: null,
                    message: response.data.message,
                    success: true
                }
            }

            return {
                data: null,
                message: "User not found",
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the update of the User");
        }
    }

    async deleteUser(id: string | null): Promise<RepositoryOutput> {
        try {
            const m = document.cookie.match(/accessToken=([^;]+)/);
            const token = m ? m[1] : null
            const response = await axios.delete(`${apiUrl}/user${id ? `/${id}` : ""}`, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            return {
                data: null,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the deletion of the User");
        }
    }
}

export default UserRepository;