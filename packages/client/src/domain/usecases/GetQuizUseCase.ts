import type { QuizRepositoryInterface } from "../../adapters/data/repositories/QuizRepositoryInterface";
import type { GetQuizInput } from "../../interfaces/inputs/GetQuizInput";
import Quiz from "../entities/Quiz";

class GetQuizUseCase {
    constructor(private quizRepository: QuizRepositoryInterface) { }

    async execute(input: GetQuizInput): Promise<Quiz | null> {
        const { id } = input;

        try {
            const response = await this.quizRepository.getQuiz(id);

            if (response.success && response.data) {
                const data = response.data;
                const quizData = new Quiz(data.id, data.title, data.difficulty, data.user, data.createdAt, data.notes, data.comments);

                return quizData
            }

            return null
        } catch(err: any) {
            return null
        }
    }
}

export default GetQuizUseCase;