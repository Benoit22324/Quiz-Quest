import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

export interface RunRepositoryInterface {
    getRunByUser: (userId: string) => Promise<RepositoryOutput>
    addRun: (quizId: string, result: number) => Promise<RepositoryOutput>
}