import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

export interface UserRepositoryInterface {
    getUser: (id: string | null) => Promise<RepositoryOutput>
    updateUser: (username: string, email: string, password: string) => Promise<RepositoryOutput>
    deleteUser: () => Promise<RepositoryOutput>
}