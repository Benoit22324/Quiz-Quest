import type { CommentRepositoryInterface } from "../../adapters/data/repositories/CommentRepositoryInterface";
import type { AddCommentInput } from "../../interfaces/inputs/AddCommentInput";

class AddCommentUseCase {
    constructor(private commentRepository: CommentRepositoryInterface) { }

    async execute(input: AddCommentInput): Promise<boolean> {
        const { quizId, content } = input;

        try {
            const response = await this.commentRepository.addComment(quizId, content);

            if (response.success) return true

            return false
        } catch(err: any) {
            throw new Error("Error during the creation of the Comment");
        }
    }
}

export default AddCommentUseCase;