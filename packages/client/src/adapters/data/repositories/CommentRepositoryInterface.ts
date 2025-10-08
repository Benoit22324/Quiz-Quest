import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

export interface CommentRepositoryInterface {
    addComment: (quizId: string, content: string) => Promise<RepositoryOutput>
    deleteComment: (id: string) => Promise<RepositoryOutput>
}