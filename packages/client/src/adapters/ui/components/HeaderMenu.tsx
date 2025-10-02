import { CgClose } from "react-icons/cg"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export type HeaderMenuProps = {
    onClose: () => void
}

export const HeaderMenu = ({ onClose }: HeaderMenuProps) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const underlineCurrent = (path: string) => {
        return location.pathname === path ? " nav_link_current" : ""
    }

    return <>
        <div className="header_menu_component">
            <CgClose className="header_menu_close_btn" onClick={onClose} />

            <nav className="nav_bar_container">
                <ul className="nav_bar">
                    <Link to="/" className={`nav_link${underlineCurrent("/")}`} onClick={onClose}>
                        <li>Home</li>
                    </Link>
                    <Link to="/quiz" className={`nav_link${underlineCurrent("/quiz")}`} onClick={onClose}>
                        <li>Quiz</li>
                    </Link>
                    {
                        user ? <>
                            <Link to="/create" className="nav_link" onClick={logout}>
                                <li>Create Quiz</li>
                            </Link>
                            <Link to="/profile" className="nav_link" onClick={logout}>
                                <li>Profile</li>
                            </Link>
                            <Link to="/" className="nav_link" onClick={logout}>
                                <li>Logout</li>
                            </Link>
                        </>
                        : <>
                            <Link to="/login" className={`nav_link${underlineCurrent("/login")}`} onClick={onClose}>
                                <li>Login</li>
                            </Link>
                            <Link to="/" className={`nav_link${underlineCurrent("/register")}`} onClick={onClose}>
                                <li>Register</li>
                            </Link>
                        </>
                    }
                </ul>
            </nav>
        </div>
    </>
}