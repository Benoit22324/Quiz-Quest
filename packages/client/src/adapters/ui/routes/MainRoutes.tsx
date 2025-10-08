import { Navigate, Route, Routes } from "react-router-dom"
import { GlobalLayout } from "../layouts/GlobalLayout"
import { HomePage } from "../pages/HomePage"
import { QuizListPage } from "../pages/QuizListPage"
import { useAuth } from "../context/AuthContext"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { QuizPage } from "../pages/QuizPage"
import { PartPage } from "../pages/PartPage"
import { ProfilePage } from "../pages/ProfilePage"
import { QuizCreationPage } from "../pages/QuizCreationPage"
import { AdminPage } from "../pages/AdminPage"

export const MainRoutes = () => {
    const { user } = useAuth();

    return <>
        <Routes>
            <Route element={<GlobalLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/quizs" element={<QuizListPage />} />
                <Route path="/quiz/:id" element={<QuizPage />} />
                <Route path="/part/:quizId" element={<PartPage />} />

                {
                    user ? <>
                        <Route path="/create" element={<QuizCreationPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/admin" element={<AdminPage />} />
                    </>
                    : <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </>
                }
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
}