import axios from "axios";
import type { AuthRepositoryInterface } from "../repositories/AuthRepositoryInterface";
import { apiUrl } from "../../../env";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";
import { repositoryError } from "../../../domain/errors/repositoryError";

class AuthRepository implements AuthRepositoryInterface {
    async login(email: string, password: string): Promise<RepositoryOutput> {
        try {
            const response = await axios.post(`${apiUrl}/login`, {
                email,
                password
            }, {
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
                message: "Invalid Credentials",
                success: true
            }
        } catch(err: any) {
            return repositoryError(err.response.data.message)
        }
    }

    async logout(): Promise<void> {
        try {
            await axios.get(`${apiUrl}/logout`, {
                withCredentials: true
            });
        } catch(err: any) {
            throw new Error("Error during the logout");
        }
    }
}

export default AuthRepository;