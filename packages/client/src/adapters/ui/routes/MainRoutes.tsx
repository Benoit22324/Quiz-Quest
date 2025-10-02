import { Navigate, Route, Routes } from "react-router-dom"
import { GlobalLayout } from "../layouts/GlobalLayout"
import { HomePage } from "../pages/HomePage"

export const MainRoutes = () => {
    return <>
        <Routes>
            <Route element={<GlobalLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
}