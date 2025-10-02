import type { RepositoryOutput } from "../../interfaces/outputs/RepositoryOutput"

export const repositoryError = (message: string): RepositoryOutput => {
    return {
        data: null,
        message,
        success: false
    }
}