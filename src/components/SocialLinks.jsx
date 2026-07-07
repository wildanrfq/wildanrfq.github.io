import { GitHubIcon, LinkedInIcon, DiscordIcon, InstagramIcon } from "./icons";
import { SOCIAL_LINKS } from "../config/site";

export function SocialLinks() {
  const iconClass = "w-9 h-9 text-[#a0aec0] hover:text-[#63b3ed] transition-colors duration-200";

  return (
    <div className="flex items-center gap-5 py-2">
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <GitHubIcon className={iconClass} />
      </a>
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedInIcon className={iconClass} />
      </a>
      <a
        href={SOCIAL_LINKS.discord}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discord"
      >
        <DiscordIcon className={iconClass} />
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <InstagramIcon className={iconClass} />
      </a>
    </div>
  );
}

