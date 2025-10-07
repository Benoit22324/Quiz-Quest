import type { PartRepositoryInterface } from "../../adapters/data/repositories/PartRepositoryInterface";
import type { GetAllPartsInput } from "../../interfaces/inputs/GetAllPartsInput";
import type { AllParts } from "../entities/Part";

class GetAllPartsUseCase {
    constructor(private partRepository: PartRepositoryInterface) { }

    async execute(input: GetAllPartsInput): Promise<AllParts[] | null> {
        const { quizId } = input;

        try {
            const response = await this.partRepository.getAllParts(quizId);

            if (response.success && response.data) {
                const convertParts: AllParts[] = response.data.map((part: any) => part as AllParts);
                const sortedParts: AllParts[] = convertParts.sort((a, b) => a.quizIndex - b.quizIndex);

                return sortedParts
            }

            return null
        } catch(err: any) {
            return null
        }
    }
}

export default GetAllPartsUseCase;