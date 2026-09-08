import {
  SiTelegram,
  SiYoutube,
  SiInstagram,
  SiFacebook,
} from "@icons-pack/react-simple-icons";
import { getSocialLinks } from "@/lib/content/social-links";
import { cn } from "@/lib/utils";

const platforms = [
  { key: "telegram", Icon: SiTelegram, label: "Telegram" },
  { key: "youtube", Icon: SiYoutube, label: "YouTube" },
  { key: "instagram", Icon: SiInstagram, label: "Instagram" },
  { key: "facebook", Icon: SiFacebook, label: "Facebook" },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  const links = getSocialLinks();
  const items = platforms.filter(({ key }) => links[key]);

  if (items.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {items.map(({ key, Icon, label }) => (
        <a
          key={key}
          href={links[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
