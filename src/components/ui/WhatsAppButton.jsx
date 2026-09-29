import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import gymConfig from "../../config/gymConfig";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import gsap from "gsap";

const WhatsAppButton = () => {
  const { t } = useTranslation();
  const { data: settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const siteName = settings?.gymName || gymConfig.name;
  const whatsappNumber = settings?.whatsapp || gymConfig.whatsapp;

  useEffect(() => {
    // Show after scroll
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        ".whatsapp-btn",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(0.6)" },
      );
    }
  }, [isVisible]);

  const sendWhatsApp = (message) => {
    const number = whatsappNumber.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  const quickMessages = [
    {
      label: "Réserver une séance",
      message: `Bonjour, je souhaite réserver une séance d'essai à ${siteName}.`,
    },
    {
      label: "Demander les tarifs",
      message: `Bonjour, je souhaite avoir plus d'informations sur les abonnements de ${siteName}.`,
    },
    {
      label: "Autre demande",
      message: `Bonjour, je souhaite avoir plus d'informations sur ${siteName}.`,
    },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Quick messages popup */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 w-64 bg-gym-bg-light rounded-xl border border-gym-border shadow-2xl overflow-hidden animate-slideUp">
          <div className="p-3 border-b border-gym-border">
            <span className="text-white font-medium text-sm">
              Que puis-je faire pour vous ?
            </span>
          </div>
          <div className="p-2 space-y-1">
            {quickMessages.map((item, index) => (
              <button
                key={index}
                onClick={() => sendWhatsApp(item.message)}
                className="w-full text-left px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-btn relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="WhatsApp"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366]/30 animate-ping" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
