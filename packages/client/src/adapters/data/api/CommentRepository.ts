import axios from "axios";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";
import type { CommentRepositoryInterface } from "../repositories/CommentRepositoryInterface";
import { apiUrl } from "../../../env";

class CommentRepository implements CommentRepositoryInterface {
    async addComment(quizId: string, content: string): Promise<RepositoryOutput> {
        try {
            const response = await axios.post(`${apiUrl}/comment/${quizId}`, {
                content
            }, {
                withCredentials: true
            })

            return {
                data: null,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the creation of the Comment");
        }
    }

    async deleteComment(id: string): Promise<RepositoryOutput> {
        try {
            const response = await axios.delete(`${apiUrl}/comment/${id}`, {
                withCredentials: true
            })

            return {
                data: null,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the deletion of the Comment");
        }
    }
}

export default CommentRepository;