import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

interface ISocial {
  containerClassName: string;
  iconClassName: string;
  socials: { icon: React.ReactNode; path: string; name: string }[];
}

export const Social = ({ containerClassName, iconClassName, socials }: ISocial) => {
  return (
    <div className={containerClassName}>
      {socials.map((item) => {
        return (
          <Link
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClassName}
            key={uuidv4()}
            aria-label={item.name}
          >
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};
