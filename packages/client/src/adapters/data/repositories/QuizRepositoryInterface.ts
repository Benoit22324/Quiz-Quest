import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

export interface QuizRepositoryInterface {
    getAllQuizs: () => Promise<RepositoryOutput>
    getQuiz: (id: string) => Promise<RepositoryOutput>
    addQuiz: (title: string, difficulty: string) => Promise<RepositoryOutput>
    deleteQuiz: (id: string) => Promise<RepositoryOutput>
}