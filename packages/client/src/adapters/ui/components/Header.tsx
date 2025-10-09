import { Link } from "react-router-dom";
import logo from "../../../../public/images/QuizQuestLogo.png";
import { LuMenu } from "react-icons/lu"
import { useState } from "react";
import { HeaderMenu } from "./HeaderMenu";

export const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return <>
        <header className="header_component">
            <div className="header_logo">
                <Link to="/">
                    <img src={logo} alt="Quiz Quest Logo" />
                </Link>
            </div>

            <LuMenu className="header_burger_menu" onClick={() => setIsOpen(!isOpen)} />

            {
                isOpen && <HeaderMenu
                    onClose={() => setIsOpen(false)}
                />
            }
        </header>
    </>
}