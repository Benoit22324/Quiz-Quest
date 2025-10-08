import type { UserRepositoryInterface } from "../../adapters/data/repositories/UserRepositoryInterface";
import type { GetUserInput } from "../../interfaces/inputs/GetUserInput";
import User from "../entities/User";

class GetUserUseCase {
    constructor(private userRepository: UserRepositoryInterface) { }

    async execute(input: GetUserInput): Promise<User | null> {
        const { id } = input;

        try {
            const response = await this.userRepository.getUser(id);

            if (response.success && response.data) {
                const responseData = response.data;

                const userData = new User(
                    responseData.id,
                    responseData.username,
                    responseData.email,
                    responseData.admin,
                    responseData.createdAt
                )

                return userData
            }

            return null
        } catch(err: any) {
            return null
        }
    }
}

export default GetUserUseCase;