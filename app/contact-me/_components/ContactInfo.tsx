import { email } from "@/data";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <>
    <div>
      <p className="text-sm text-gray-400">Name</p>
      <a
        href={`mailto:${email}`}
        className="text-md text-white font-medium hover:underline"
      >
        Ayush Solanki
      </a>
    </div>
    <div>
      <p className="text-sm text-gray-400">Email Address</p>
      <a
        href={`mailto:${email}`}
        className="text-md text-white font-medium hover:underline"
      >
        {email}
      </a>
    </div>
    <div>
      <p className="text-sm text-gray-400 mb-2">Connect with Me</p>
      <div className="flex flex-col gap-2">
        <a
          href="https://github.com/ayushsolanki29"
          target="_blank"
          className="flex items-center gap-2 text-white font-medium hover:underline"
        >
          <FaGithub className="h-5 w-5" />
          GitHub
        </a>
        <a
          href="https://instagram.com/ayushsolanki.exe"
          target="_blank"
          className="flex items-center gap-2 text-white font-medium hover:underline"
        >
          <FaInstagram className="h-5 w-5" />
          Instagram
        </a>
        <a
          href="#"
          target="_blank"
          className="flex items-center gap-2 text-white font-medium hover:underline"
        >
          <FaLinkedin className="h-5 w-5" />
          LinkedIn
        </a>
      </div>
    </div>
    <div>
      <p className="text-sm text-gray-400">Location</p>
      <span className="text-md text-white">Ahemdabad, Gujarat, India</span>
    </div>
  </>
  
  );
};

export default ContactInfo;
