import { FaFacebook, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export const Footer = () => {
    return <>
        <footer className="footer_component">
            <span className="footer_conditions">Terms & Privacy</span>

            <p className="footer_copy">Copyright @ 2025 - Quiz Quest</p>

            <div className="footer_socials">
                <FaYoutube className="footer_socials_icon footer_social_ytb" />
                <FaXTwitter className="footer_socials_icon" />
                <FaFacebook className="footer_socials_icon footer_social_facebook" />
            </div>
        </footer>
    </>
}