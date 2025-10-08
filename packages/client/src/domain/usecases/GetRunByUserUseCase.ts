import type { RunRepositoryInterface } from "../../adapters/data/repositories/RunRepositoryInterface";
import type { GetRunByUserInput } from "../../interfaces/inputs/GetRunByUserInput";
import Run from "../entities/Run";

class GetRunByUserUseCase {
    constructor(private runRepository: RunRepositoryInterface) { }

    async execute(input: GetRunByUserInput): Promise<Run[] | null> {
        const { userId } = input;

        try {
            const response = await this.runRepository.getRunByUser(userId);

            if (response.success && response.data) {
                const convertedRuns: Run[] = response.data.map((run: any) => new Run(run.id, run.result, run.createdAt, run.quiz));
                const sortedRuns = convertedRuns.sort((a, b) => new Date(b.getCreatedAt()).getTime() - new Date(a.getCreatedAt()).getTime());
                
                return sortedRuns
            }

            return null
        } catch(err: any) {
            return null
        }
    }
}

export default GetRunByUserUseCase;