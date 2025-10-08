import type { UserRepositoryInterface } from "../../adapters/data/repositories/UserRepositoryInterface";
import type { DeleteUserInput } from "../../interfaces/inputs/DeleteUserInput";

class DeleteUserUseCase {
    constructor(private userRepository: UserRepositoryInterface) { }

    async execute(input: DeleteUserInput): Promise<boolean> {
        const { id } = input;

        try {
            const response = await this.userRepository.deleteUser(id);

            if (response.success) return true

            return false
        } catch(err: any) {
            throw new Error("Error during the deletion of the User");
        }
    }
}

export default DeleteUserUseCase;