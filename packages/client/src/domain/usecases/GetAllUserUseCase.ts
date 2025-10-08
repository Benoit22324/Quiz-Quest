import type { UserRepositoryInterface } from "../../adapters/data/repositories/UserRepositoryInterface";
import User from "../entities/User";

class GetAllUserUseCase {
    constructor(private userRepository: UserRepositoryInterface) { }

    async execute(): Promise<User[] | null> {
        try {
            const response = await this.userRepository.getAllUser();

            if (response.success && response.data) {
                const convertedUser = response.data.map((user: any) => new User(user.id, user.username, user.email, user.admin, user.createdAt));

                return convertedUser
            }

            return null
        } catch(err: any) {
            return null
        }
    }
}

export default GetAllUserUseCase;