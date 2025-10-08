import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

export interface UserRepositoryInterface {
    getAllUser: () => Promise<RepositoryOutput>
    getUser: (id: string | null) => Promise<RepositoryOutput>
    updateUser: (username: string, email: string, password: string) => Promise<RepositoryOutput>
    deleteUser: (id: string | null) => Promise<RepositoryOutput>
}