import { FloatingNav } from "@/components/ui/floating-navbar";

import { email, navItems } from "@/data";

import ContactForm from "./_components/form";
import ContactInfo from "./_components/ContactInfo";
const Contact = () => {
  return (
    <div>
      {" "}
      <FloatingNav navItems={navItems} />
      <br />
      <br />
      <div className="py-20 w-full">
        <h1 className="heading">
          Contact <span className="text-purple">Me</span>
        </h1>
        <p className="text-sm text-muted-foreground text-center mt-3">
          Send me a message or reach out to me via email at{" "}
          <a className="text-purple" href={`mailto:${email}`}>
            {email}
          </a>
          . I&apos;m always here to help!
        </p>

        <div className="p-6 max-w-4xl mx-auto rounded-lg shadow-md flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <ContactForm />

          {/* Contact Information Section */}
          <div className="w-full lg:w-1/4 flex flex-col gap-6">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
