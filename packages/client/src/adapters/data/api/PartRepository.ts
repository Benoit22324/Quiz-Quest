import axios from "axios";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";
import type { PartRepositoryInterface } from "../repositories/PartRepositoryInterface";
import { apiUrl } from "../../../env";

class PartRepository implements PartRepositoryInterface {
    async getAllParts(quidId: string): Promise<RepositoryOutput> {
        try {
            const response = await axios.get(`${apiUrl}/part/${quidId}`);

            return {
                data: response.data.data,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of the Quiz Parts");
        }
    }

    async getPart(quizId: string, index: number): Promise<RepositoryOutput> {
        try {
            const response = await axios.get(`${apiUrl}/part/${quizId}/${index}`);

            return {
                data: response.data.data,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of the Quiz Part");
        }
    }

    async addPart(quizId: string, question: string, answers: string, correctAnswer: string, index: number): Promise<RepositoryOutput> {
        try {
            const m = document.cookie.match(/accessToken=([^;]+)/);
            const token = m ? m[1] : null
            const response = await axios.post(`${apiUrl}/part/${quizId}`, {
                question,
                answers,
                correctAnswer,
                index
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
            throw new Error("Error during the creation of the Part");
        }
    }
}

export default PartRepository;