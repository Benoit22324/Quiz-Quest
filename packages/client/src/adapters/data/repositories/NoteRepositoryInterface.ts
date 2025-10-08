import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

export interface NoteRepositoryInterface {
    getNoteByUser: (quizId: string) => Promise<RepositoryOutput>
    addNote: (quizId: string, note: number) => Promise<RepositoryOutput>
    updateNote: (id: string, quidId: string, note: number) => Promise<RepositoryOutput>
}