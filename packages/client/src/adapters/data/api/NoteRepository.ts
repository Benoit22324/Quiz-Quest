import axios from "axios";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";
import type { NoteRepositoryInterface } from "../repositories/NoteRepositoryInterface";
import { apiUrl } from "../../../env";

class NoteRepository implements NoteRepositoryInterface {
    async getNoteByUser(quizId: string): Promise<RepositoryOutput> {
        try {
            const response = await axios.get(`${apiUrl}/note/${quizId}/user`, {
                withCredentials: true
            });

            if (response.status !== 200) {
                return {
                    data: null,
                    message: "User didn't note the Quiz yet",
                    success: true
                }
            }

            return {
                data: response.data.data,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of the User Note");
        }
    }

    async addNote(quizId: string, note: number): Promise<RepositoryOutput> {
        try {
            const response = await axios.post(`${apiUrl}/note/${quizId}`, {
                note
            }, {
                withCredentials: true
            })

            return {
                data: null,
                message: response.data.message,
                success: true
            }
        } catch(err:any) {
            throw new Error("Error during the fetch of the Note creation");
        }
    }

    async updateNote(id: string, quizId: string, note: number): Promise<RepositoryOutput> {
        try {
            const response = await axios.put(`${apiUrl}/note/${id}`, {
                note,
                quizId
            }, {
                withCredentials: true
            })

            return {
                data: null,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            throw new Error("Error during the update of the Note");
        }
    }
}

export default NoteRepository;