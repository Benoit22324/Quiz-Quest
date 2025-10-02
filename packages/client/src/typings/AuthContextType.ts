import type User from "../domain/entities/User"
import type { LoginInput } from "../interfaces/inputs/LoginInput"

export type AuthContextType = {
    user: User | null
    login: (input: LoginInput) => Promise<void>
    logout: () => Promise<void>
}