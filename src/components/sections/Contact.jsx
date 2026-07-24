import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiArrowUpRight, HiCheck, HiOutlineDocumentDuplicate } from "react-icons/hi2";

const contactChannels = [
  {
    id: "whatsapp",
    title: "WhatsApp Direct",
    label: "+91 98765 43210",
    link: "https://wa.me/919876543210",
    actionText: "Open WhatsApp",
    icon: FaWhatsapp,
    subtitle: "Instant messaging for active briefs & project scope",
  },
  {
    id: "instagram",
    title: "Instagram Studio",
    label: "@neostack.in",
    link: "https://instagram.com",
    actionText: "Follow Instagram",
    icon: FaInstagram,
    subtitle: "Daily R&D motion graphics, 3D renders & lab news",
  },
  {
    id: "email",
    title: "Email Dispatch",
    label: "hello@neostack.studio",
    link: "mailto:hello@neostack.studio",
    actionText: "Send Mail",
    icon: MdEmail,
    subtitle: "RFP documents, official contracts & technical briefs",
  },
  {
    id: "phone",
    title: "Direct Phone Line",
    label: "+91 98765 43210",
    link: "tel:+919876543210",
    actionText: "Call Studio",
    icon: FaPhoneAlt,
    subtitle: "Direct voice line with our technical direction team",
  },
];

function Contact() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white text-black py-28 sm:py-36 border-t border-[#ECECEC]"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECECEC] pb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#777777]">
              09 / DIRECT STUDIO INITIATION
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-black max-w-3xl">
              Initiate a brief. <br />
              <span className="italic font-serif font-light text-[#444444]">No forms required.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-light leading-relaxed text-[#555555]">
            Pick your preferred direct channel below. We respond to all technical inquiries and project briefs within 4 hours.
          </p>
        </div>

        {/* 4 Channel Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {contactChannels.map((item) => {
            const Icon = item.icon;
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-3xl border border-[#ECECEC] bg-[#F9F9FB] p-8 sm:p-10 transition-all duration-300 hover:border-black hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white text-xl">
                      <Icon />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.label)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#ECECEC] px-3.5 py-1 font-mono text-xs text-[#555555] transition-all hover:border-black hover:text-black"
                    >
                      {isCopied ? (
                        <>
                          <HiCheck className="text-green-600" />
                          <span className="text-green-600 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <HiOutlineDocumentDuplicate />
                          <span>Copy Info</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="mt-8 font-display text-2xl sm:text-3xl font-light text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 font-mono text-sm font-medium text-black">
                    {item.label}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm font-light text-[#666666]">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-10 border-t border-[#ECECEC] pt-6">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full rounded-full bg-black px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#222222]"
                  >
                    <span>{item.actionText}</span>
                    <HiArrowUpRight className="text-sm" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Contact;
