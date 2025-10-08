import type { QuizRepositoryInterface } from "../../adapters/data/repositories/QuizRepositoryInterface";
import type { AddQuizInput } from "../../interfaces/inputs/AddQuizInput";

class AddQuizUseCase {
    constructor(private quizRepository: QuizRepositoryInterface) { }

    async execute(input: AddQuizInput): Promise<string | null> {
        const { title, difficulty } = input;

        try {
            const response = await this.quizRepository.addQuiz(title, difficulty);

            if (response.success && response.data) return response.data.id

            return null
        } catch(err: any) {
            return null
        }
    }
}

export default AddQuizUseCase;