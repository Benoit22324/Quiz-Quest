import React, { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { AuthContextType } from "../../../typings/AuthContextType";
import type User from "../../../domain/entities/User";
import AuthRepository from "../../data/api/AuthRepository";
import LoginUseCase from "../../../domain/usecases/LoginUseCase";
import type { LoginInput } from "../../../interfaces/inputs/LoginInput";
import UserRepository from "../../data/api/UserRepository";
import GetUserUseCase from "../../../domain/usecases/GetUserUseCase";
import LogoutUseCase from "../../../domain/usecases/LogoutUseCase";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const authRepository = new AuthRepository();
    const userRepository = new UserRepository();
    const loginUseCase = new LoginUseCase(authRepository);
    const logoutUseCase = new LogoutUseCase(authRepository);
    const getUserUseCase = new GetUserUseCase(userRepository);

    const [user, setUser] = useState<User | null>(null);

    const login = async (input: LoginInput): Promise<void> => {
        try {
            const response = await loginUseCase.execute(input);

            if (response) {
                const userData = await getUserUseCase.execute({ id: response });

                setUser(userData);
            }
        } catch(err: any) {
            throw new Error("Error during the login");
        }
    }

    const logout = async (): Promise<void> => {
        try {
            await logoutUseCase.execute();

            setUser(null);
        } catch(err: any) {
            throw new Error("Error during the logout");
        }
    }

    const authContextValue: AuthContextType = {
        user,
        login,
        logout
    }

    return <AuthContext.Provider value={authContextValue}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error("Error during the initialisation of AuthContext");

    return context;
}