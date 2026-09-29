import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { Send, Loader2, CheckCircle } from "lucide-react";
import gsap from "gsap";
import Button from "../ui/Button";

// Replace with your EmailJS credentials
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ReservationForm = () => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    activity: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          activity: formData.activity,
          date: formData.date,
          time: formData.time,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );

      if (result.status === 200) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          activity: "",
          date: "",
          time: "",
          message: "",
        });

        // Success animation
        gsap.fromTo(
          ".success-check",
          { scale: 0, opacity: 0, rotation: -180 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(0.6)",
          },
        );

        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder=" "
            className="w-full bg-white/5 border border-gym-border rounded-xl px-4 py-3.5 text-white placeholder-transparent focus:outline-none focus:border-gym-orange transition-colors duration-300"
          />
          <label className="absolute left-4 top-3.5 text-white/40 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gym-orange">
            {t("reservation.form.name")}
          </label>
        </div>

        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder=" "
            className="w-full bg-white/5 border border-gym-border rounded-xl px-4 py-3.5 text-white placeholder-transparent focus:outline-none focus:border-gym-orange transition-colors duration-300"
          />
          <label className="absolute left-4 top-3.5 text-white/40 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gym-orange">
            {t("reservation.form.phone")}
          </label>
        </div>
      </div>

      <div className="relative">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder=" "
          className="w-full bg-white/5 border border-gym-border rounded-xl px-4 py-3.5 text-white placeholder-transparent focus:outline-none focus:border-gym-orange transition-colors duration-300"
        />
        <label className="absolute left-4 top-3.5 text-white/40 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gym-orange">
          {t("reservation.form.email")}
        </label>
      </div>

      <div className="relative">
        <select
          name="activity"
          value={formData.activity}
          onChange={handleChange}
          className="w-full bg-white/5 border border-gym-border rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-gym-orange transition-colors duration-300 appearance-none"
        >
          <option value="" className="text-black">
            {t("reservation.form.activity")}
          </option>
          <option value="force" className="text-black">
            Force & Musculation
          </option>
          <option value="cardio" className="text-black">
            Cardio Training
          </option>
          <option value="cross" className="text-black">
            Cross Training
          </option>
          <option value="boxing" className="text-black">
            Boxing
          </option>
          <option value="yoga" className="text-black">
            Yoga & Bien-être
          </option>
          <option value="personal" className="text-black">
            Coaching Personnalisé
          </option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-white/5 border border-gym-border rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-gym-orange transition-colors duration-300"
          />
        </div>

        <div className="relative">
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full bg-white/5 border border-gym-border rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-gym-orange transition-colors duration-300"
          />
        </div>
      </div>

      <div className="relative">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder=" "
          className="w-full bg-white/5 border border-gym-border rounded-xl px-4 py-3.5 text-white placeholder-transparent focus:outline-none focus:border-gym-orange transition-colors duration-300 resize-none"
        />
        <label className="absolute left-4 top-3.5 text-white/40 text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-gym-orange">
          {t("reservation.form.message")}
        </label>
      </div>

      {error && <div className="text-red-400 text-sm text-center">{error}</div>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("contact.form.sending")}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {t("reservation.form.submit")}
          </>
        )}
      </Button>

      {isSubmitted && (
        <div className="success-check flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{t("reservation.success")}</span>
        </div>
      )}
    </form>
  );
};

export default ReservationForm;
