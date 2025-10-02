import axios from "axios";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";
import type { UserRepositoryInterface } from "../repositories/UserRepositoryInterface";
import { apiUrl } from "../../../env";

class UserRepository implements UserRepositoryInterface {
    async getUser(id: string | null): Promise<RepositoryOutput> {
        try {
            const response = await axios.get(`${apiUrl}/user${id ? `/${id}` : ""}`, {
                withCredentials: true
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
}

export default UserRepository;