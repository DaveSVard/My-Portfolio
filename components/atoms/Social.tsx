import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

interface ISocial {
  containerClassName: string;
  iconClassName: string;
  socials: { icon: React.ReactNode; path: string }[];
}

export const Social = ({ containerClassName, iconClassName, socials }: ISocial) => {

  return (
    <div className={containerClassName}>
      {socials.map((item) => {
        return (
          <Link
            href={item.path}
            target="_blank"
            className={iconClassName}
            key={uuidv4()}
          >
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};
