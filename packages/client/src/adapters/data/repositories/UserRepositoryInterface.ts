import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

export interface UserRepositoryInterface {
    getUser: (id: string | null) => Promise<RepositoryOutput>
}