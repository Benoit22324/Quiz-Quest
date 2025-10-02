import type { QuizRepositoryInterface } from "../../adapters/data/repositories/QuizRepositoryInterface";
import Quiz from "../entities/Quiz";

class GetAllQuizsUseCase {
    constructor(private quizRepository: QuizRepositoryInterface) { }

    async execute(): Promise<Quiz[] | null> {
        try {
            const response = await this.quizRepository.getAllQuizs();

            if (response.success && response.data) {
                const quizDatas: Quiz[] = response.data.map((quiz: any) => new Quiz(quiz.id, quiz.title, quiz.difficulty, quiz.user, quiz.createdAt, quiz.notes, null));

                return quizDatas
            }

            return null
        } catch(err: any) {
            throw new Error("Error during the fetch of Quizs");
        }
    }
}

export default GetAllQuizsUseCase;