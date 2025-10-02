import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

export interface QuizRepositoryInterface {
    getAllQuizs: () => Promise<RepositoryOutput>
}