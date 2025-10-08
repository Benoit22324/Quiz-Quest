import type User from "../domain/entities/User"
import type { LoginInput } from "../interfaces/inputs/LoginInput"
import type { RegisterInput } from "../interfaces/inputs/RegisterInput"

export type AuthContextType = {
    user: User | null
    login: (input: LoginInput) => Promise<boolean>
    register: (input: RegisterInput) => Promise<string | boolean>
    logout: () => Promise<void>
}