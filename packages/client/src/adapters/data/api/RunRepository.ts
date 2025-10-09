import axios from "axios";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";
import type { RunRepositoryInterface } from "../repositories/RunRepositoryInterface";
import { apiUrl } from "../../../env";

class RunRepository implements RunRepositoryInterface {
    async getRunByUser(userId: string): Promise<RepositoryOutput> {
        try {
            const m = document.cookie.match(/accessToken=([^;]+)/);
            const token = m ? m[1] : null
            const response = await axios.get(`${apiUrl}/run/${userId}`, {
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

            return {
                data: null,
                message: "Run not found",
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of the Runs");
        }
    }

    async addRun(quizId: string, result: number): Promise<RepositoryOutput> {
        try {
            const m = document.cookie.match(/accessToken=([^;]+)/);
            const token = m ? m[1] : null
            const response = await axios.post(`${apiUrl}/run/${quizId}`, {
                result
            }, {
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
            throw new Error("Error during the creation of the Run");
        }
    }
}

export default RunRepository;