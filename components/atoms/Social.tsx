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
    { icon: <FaGithub />, path: "https://github.com/DaveSVard" },
    { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/david-vardanyan-738b95336/" },
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
