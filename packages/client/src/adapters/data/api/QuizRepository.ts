import axios from "axios";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";
import type { QuizRepositoryInterface } from "../repositories/QuizRepositoryInterface";
import { apiUrl } from "../../../env";

class QuizRepository implements QuizRepositoryInterface {
    async getAllQuizs(): Promise<RepositoryOutput> {
        try {
            const response = await axios.get(`${apiUrl}/quiz`);

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
            throw new Error("Error during the fetch of Quizs");
        }
    }

    async getQuiz(id: string): Promise<RepositoryOutput> {
        try {
            const response = await axios.get(`${apiUrl}/quiz/${id}`, {
                withCredentials: true
            });

            return {
                data: response.data.data,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of the Quiz");
        }
    }
}

export default QuizRepository;