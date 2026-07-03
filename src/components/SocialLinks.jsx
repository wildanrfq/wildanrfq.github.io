import github from "../assets/github.png";
import discord from "../assets/discord.png";
import instagram from "../assets/instagram.png";
import { LinkedInIcon } from "./icons";
import { SOCIAL_LINKS } from "../config/site";

export function SocialLinks() {
  return (
    <div className="flex items-center">
      <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
        <img src={github} alt="GitHub" className="w-[50px] m-[10px] invert" />
      </a>
      <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
        <LinkedInIcon className="w-[38px] h-[38px] m-[16px] text-white" />
      </a>
      <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer">
        <img src={discord} alt="Discord" className="w-[50px] m-[10px] invert" />
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={instagram}
          alt="Instagram"
          className="w-[50px] m-[10px] invert"
        />
      </a>
    </div>
  );
}
