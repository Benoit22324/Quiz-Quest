import type { AuthRepositoryInterface } from "../../adapters/data/repositories/AuthRepositoryInterface";
import type { RegisterInput } from "../../interfaces/inputs/RegisterInput";

class RegisterUseCase {
    constructor(private authRepository: AuthRepositoryInterface) { }

    async execute(input: RegisterInput): Promise<string | boolean> {
        const { username, email, password } = input;

        try {
            const response = await this.authRepository.register(username, email, password);

            if (response.success) return true

            return response.message
        } catch(err: any) {
            throw new Error("Error during the login");
        }
    }
}

export default RegisterUseCase;