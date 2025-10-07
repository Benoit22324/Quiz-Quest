import type { PartRepositoryInterface } from "../../adapters/data/repositories/PartRepositoryInterface";
import type { GetPartInput } from "../../interfaces/inputs/GetPartInput";
import Part from "../entities/Part";

class GetPartUseCase {
    constructor(private partRepository: PartRepositoryInterface) { }

    async execute(input: GetPartInput): Promise<Part | null> {
        const { quizId, index } = input;

        try {
            const response = await this.partRepository.getPart(quizId, index);

            if (response) {
                const responseData = response.data;
                const convertPart = new Part(responseData.id, responseData.question, responseData.answers, responseData.correctAnswer, responseData.quizIndex);

                return convertPart
            }

            return null
        } catch(err: any) {
            throw new Error("Error during the fetch of the Quiz Part");
        }
    }
}

export default GetPartUseCase;