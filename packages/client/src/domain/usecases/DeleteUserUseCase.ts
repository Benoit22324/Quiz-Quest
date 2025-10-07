import type { UserRepositoryInterface } from "../../adapters/data/repositories/UserRepositoryInterface";

class DeleteUserUseCase {
    constructor(private userRepository: UserRepositoryInterface) { }

    async execute(): Promise<void> {
        try {
            await this.userRepository.deleteUser();
        } catch(err: any) {
            throw new Error("Error during the deletion of the User");
        }
    }
}

export default DeleteUserUseCase;