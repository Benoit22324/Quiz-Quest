import type { PartRepositoryInterface } from "../../adapters/data/repositories/PartRepositoryInterface";
import type { AddPartInput } from "../../interfaces/inputs/AddPartInput";

class AddPartUseCase {
    constructor(private partRepository: PartRepositoryInterface) { }

    async execute(input: AddPartInput): Promise<boolean> {
        const { quizId, question, answers, correctAnswer, index } = input;

        try {
            const response = await this.partRepository.addPart(quizId, question, answers, correctAnswer, index);

            if (response.success) return true

            return false
        } catch(err: any) {
            throw new Error("Error during the creation of the Part");
        }
    }
}

export default AddPartUseCase;