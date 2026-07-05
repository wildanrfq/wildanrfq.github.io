import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SocialLinks } from "../components/SocialLinks";
import { SITE } from "../config/site";

const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

export function ContactPage() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!FORM_ENDPOINT) {
      window.location.href = `mailto:${SITE.email}`;
      return;
    }

    setStatus("sending");
    const form = event.target;
    const data = new FormData(form);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#22303c] min-h-dvh text-white relative flex flex-col">
      <Navbar />

      <div className="pt-20 sm:pt-24 pb-2 px-5 flex flex-col items-center flex-grow">
        <div className="w-full max-w-xl flex flex-col flex-grow">
          <h1 className="font-mono text-4xl mb-3">contact</h1>
          <p className="text-[#a0aec0] leading-relaxed mb-6">
            Got a project in mind or just want to say hi? Send a message
            below, or reach out directly at{" "}
            <a href={`mailto:${SITE.email}`} className="text-[#63b3ed]">
              {SITE.email}
            </a>
            .
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-[#2d3748] rounded-xl p-6 shadow-md"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="font-mono text-xs text-[#a0aec0] uppercase tracking-wider"
              >
                name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="font-mono bg-[#1a202c] text-white rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#63b3ed]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-mono text-xs text-[#a0aec0] uppercase tracking-wider"
              >
                email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="font-mono bg-[#1a202c] text-white rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#63b3ed]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                className="font-mono text-xs text-[#a0aec0] uppercase tracking-wider"
              >
                message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="font-mono bg-[#1a202c] text-white rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#63b3ed] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="font-mono text-sm text-white bg-[#4a5568] hover:bg-[#1a202c] disabled:opacity-50 px-4 py-2 rounded transition-colors duration-300 self-start"
            >
              {status === "sending" ? "sending..." : "send message"}
            </button>

            {status === "sent" && (
              <p className="font-mono text-sm text-[#68d391] m-0">
                Message sent. Thanks for reaching out.
              </p>
            )}
            {status === "error" && (
              <p className="font-mono text-sm text-[#fc8181] m-0">
                Something went wrong. Try emailing directly instead.
              </p>
            )}
          </form>

          <div className="mt-auto pt-6 flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
