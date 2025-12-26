import { Social } from "@/components/atoms";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import { useMouseAnimation } from "@/lib/mouseAnimation";

const MyContacts = ({
  phone,
  email,
  socials,
  languages,
}: {
  phone: { href: string; alt: string };
  email: { href: string; alt: string };
  socials: any;
  languages: string;
}) => {
  const {
    containerRef,
    handleMouseMove,
    handleMouseLeave,
    handleMouseEnter,
    shadowStyle,
    shadowAnimation,
    shadowTransition,
  } = useMouseAnimation({ hide: true });

  return (
    <div
      ref={containerRef}
      className="w-full mdl:w-2/6 bg-white dark:bg-primary/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={shadowStyle}
        animate={shadowAnimation}
        transition={shadowTransition}
      />

      <div className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 mdl:grid-cols-1 gap-x-10 gap-y-4">
          <div className="col-span-1 sm:col-span-2 mdl:col-span-1">
            <h2 className="text-2xl font-bold">My Contacts</h2>

            <div className="flex flex-col gap-y-1 mt-2">
              <div className="flex items-center gap-x-2">
                <FaPhone className="min-w-4 min-h-4 text-gray-500 dark:text-gray-400" />
                <a
                  href={phone.href}
                  className="text-gray-500 dark:text-gray-400 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-accent after:transition-all after:duration-300 after:ease-in-out"
                >
                  {phone.alt}
                </a>
              </div>
              <div className="flex items-center gap-x-2">
                <FaEnvelope className="min-w-4 min-h-4 text-gray-500 dark:text-gray-400" />
                <a
                  href={email.href}
                  className="text-wrap text-gray-500 dark:text-gray-400 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-accent after:transition-all after:duration-300 after:ease-in-out"
                >
                  {email.alt}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="text-xl font-bold">My Socials</p>
            <Social
              socials={socials}
              containerClassName="flex gap-3"
              iconClassName="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="text-xl font-bold">Languages</p>
            <p className="text-gray-500 dark:text-gray-400">{languages}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyContacts;
