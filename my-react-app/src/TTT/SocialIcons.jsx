import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function SocialIcons(){
    return(
        <div className="icons">
            <a href="mailto:anjneylawaniya@gmail.com" target="_blank"> <FaEnvelope/> </a>
            <a href="https://github.com/Anjney-Lawaniya" target="_blank"> <FaGithub/> </a>
            <a href="https://www.linkedin.com/in/anjneylawaniya/" target="_blank"> <FaLinkedin/> </a>
        </div>
    );
}