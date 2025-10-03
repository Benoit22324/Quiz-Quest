import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

export interface AuthRepositoryInterface {
    login: (email: string, password: string) => Promise<RepositoryOutput>
    register: (username: string, email: string, password: string) => Promise<RepositoryOutput>
    logout: () => Promise<void>
}