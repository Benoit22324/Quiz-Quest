import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

export interface PartRepositoryInterface {
    getAllParts: (quizId: string) => Promise<RepositoryOutput>
    getPart: (quizId: string, index: number) => Promise<RepositoryOutput>
    addPart: (quizId: string, question: string, answers: string, correctAnswer: string, index: number) => Promise<RepositoryOutput>
}