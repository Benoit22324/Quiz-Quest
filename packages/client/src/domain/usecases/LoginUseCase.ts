import type { AuthRepositoryInterface } from "../../adapters/data/repositories/AuthRepositoryInterface";
import type { LoginInput } from "../../interfaces/inputs/LoginInput";

class LoginUseCase {
    constructor(private authRepository: AuthRepositoryInterface) { }

    async execute(input: LoginInput): Promise<string | null> {
        const { email, password } = input;

        try {
            const response = await this.authRepository.login(email, password);

            if (response.success) return response.data

            return null
        } catch(err: any) {
            throw new Error("Error during the login");
        }
    }
}

export default LoginUseCase;