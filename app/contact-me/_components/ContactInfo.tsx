import { email } from "@/data";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <>
      <div>
        <p className="text-sm text-gray-400">Email</p>
        <a
          href={`mailto:${email}`}
          className="text-md text-white hover:underline"
        >
          {email}
        </a>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Socials</p>
        <div className="flex flex-col gap-2">
          <a
            href="https://github.com/ayushsolanki29"
            target="_blank"
            className="flex items-center gap-2 text-white hover:underline"
          >
            <FaGithub className="h-5 w-5" />
            Github
          </a>
          <a
            href="https://instagram.com/ayushsolanki.exe"
            target="_blank"
            className="flex items-center gap-2 text-white hover:underline"
          >
            <FaInstagram className="h-5 w-5" />
            Instagram
          </a>
          <a
            href="#"
            target="_blank"
            className="flex items-center gap-2 text-white hover:underline"
          >
            <FaLinkedin className="h-5 w-5" />
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
