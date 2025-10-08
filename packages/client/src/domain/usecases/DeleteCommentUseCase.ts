import type { CommentRepositoryInterface } from "../../adapters/data/repositories/CommentRepositoryInterface";
import type { DeleteCommentInput } from "../../interfaces/inputs/DeleteCommentInput";

class DeleteCommentUseCase {
    constructor(private commentRepository: CommentRepositoryInterface) { }

    async execute(input: DeleteCommentInput): Promise<boolean> {
        const { id } = input;

        try {
            const response = await this.commentRepository.deleteComment(id);

            if (response.success) return true

            return false
        } catch(err: any) {
            throw new Error("Error during the deletion of the Comment");
        }
    }
}

export default DeleteCommentUseCase;