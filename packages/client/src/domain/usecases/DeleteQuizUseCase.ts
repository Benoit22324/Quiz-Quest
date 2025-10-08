import type { QuizRepositoryInterface } from "../../adapters/data/repositories/QuizRepositoryInterface";
import type { DeleteQuizInput } from "../../interfaces/inputs/DeleteQuizInput";

class DeleteQuizUseCase {
    constructor(private quizRepository: QuizRepositoryInterface) { }

    async execute(input: DeleteQuizInput): Promise<boolean> {
        const { id } = input;

        try {
            const response = await this.quizRepository.deleteQuiz(id);

            if (response.success) return true

            return false
        } catch(err: any) {
            throw new Error("Error during the deletion of the Quiz");
        }
    }
}

export default DeleteQuizUseCase;