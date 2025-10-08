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
                const quizComments = data.comments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                const quizData = new Quiz(data.id, data.title, data.difficulty, data.user, data.createdAt, data.notes, quizComments);

                return quizData
            }

            return null
        } catch(err: any) {
            return null
        }
    }
}

export default GetQuizUseCase;