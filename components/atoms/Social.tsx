import Link from "next/link";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

interface ISocial {
  containerClassName: string;
  iconClassName: string;
}

export const Social = ({ containerClassName, iconClassName }: ISocial) => {
  const socials = [
    { icon: <FaGithub />, path: "" },
    { icon: <FaLinkedinIn />, path: "" },
    { icon: <FaFacebook />, path: "" },
    { icon: <FaInstagram />, path: "" },
  ];

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
