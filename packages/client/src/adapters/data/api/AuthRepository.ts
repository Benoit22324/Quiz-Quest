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
                // debugger
                document.cookie = `accessToken=${response.data.data.accessToken};secure=true;sameSite="none"`;
                document.cookie = `autoReLog=true;secure=true;sameSite="none"`;
                

                return {
                    data: response.data.data.userId,
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

    async register(username: string, email: string, password: string): Promise<RepositoryOutput> {
        try {
            const response = await axios.post(`${apiUrl}/register`, {
                username,
                email,
                password
            }, {
                withCredentials: true
            });

            return {
                data: null,
                message: response.data.message,
                success: true
            }
        } catch(err: any) {
            return repositoryError(err.response.data.message)
        }
    }

    async logout(): Promise<void> {
        try {
            document.cookie = "accessToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = "autoReLog=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        } catch(err: any) {
            throw new Error("Error during the logout");
        }
    }
}

export default AuthRepository;