import axios from "axios";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";
import type { QuizRepositoryInterface } from "../repositories/QuizRepositoryInterface";
import { apiUrl } from "../../../env";
import { repositoryError } from "../../../domain/errors/repositoryError";

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

    async addQuiz(title: string, difficulty: string): Promise<RepositoryOutput> {
        try {
            const response = await axios.post(`${apiUrl}/quiz`, {
                title,
                difficulty
            }, {
                withCredentials: true
            });

            if (response.status === 201) {
                return {
                    data: response.data.data,
                    message: response.data.message,
                    success: true
                }
            }

            return repositoryError(response.data.message)
        } catch(err: any) {
            throw new Error("Error during the creation of the Quiz");
        }
    }

    async deleteQuiz(id: string): Promise<RepositoryOutput> {
        try {
            const response = await axios.delete(`${apiUrl}/quiz/${id}`, {
                withCredentials: true
            })

            return {
                data: null,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the deletion of the Quiz");
        }
    }
}

export default QuizRepository;