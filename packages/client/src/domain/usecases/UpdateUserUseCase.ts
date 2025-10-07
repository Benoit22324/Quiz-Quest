import type { UserRepositoryInterface } from "../../adapters/data/repositories/UserRepositoryInterface";
import type { UpdateUserInput } from "../../interfaces/inputs/UpdateUserInput";

class UpdateUserUseCase {
    constructor(private userRepository: UserRepositoryInterface) { }

    async execute(input: UpdateUserInput): Promise<boolean> {
        const { username, email, password } = input;

        try {
            const response = await this.userRepository.updateUser(username, email, password);

            if (response.success) return true

            return false
        } catch(err: any) {
            throw new Error("Error during the update of the User");
        }
    }
}

export default UpdateUserUseCase;