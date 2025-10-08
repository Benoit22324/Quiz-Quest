import type { AuthRepositoryInterface } from "../../adapters/data/repositories/AuthRepositoryInterface";

class LogoutUseCase {
    constructor(private authRepository: AuthRepositoryInterface) { }

    async execute(): Promise<void> {
        try {
            await this.authRepository.logout();
        } catch(err: any) {
            throw new Error("Error during the logout");
        }
    }
}

export default LogoutUseCase;