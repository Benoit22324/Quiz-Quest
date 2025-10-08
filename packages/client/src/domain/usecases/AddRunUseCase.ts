import type { RunRepositoryInterface } from "../../adapters/data/repositories/RunRepositoryInterface";
import type { AddRunInput } from "../../interfaces/inputs/AddRunInput";

class AddRunUseCase {
    constructor(private runRepository: RunRepositoryInterface) { }

    async execute(input: AddRunInput): Promise<boolean> {
        const { quizId, score } = input;

        try {
            const response = await this.runRepository.addRun(quizId, score);

            if (response.success) return true

            return false
        } catch(err: any) {
            throw new Error("Error during the creation of the Run");
        }
    }
}

export default AddRunUseCase;