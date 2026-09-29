import { useRef, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  Tag,
} from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import SanityImage from "../common/SanityImage";
import { usePartnerProducts } from "../../hooks/usePartnerProducts";
import { useSiteSettings } from "../../hooks/useSiteSettings";

gsap.registerPlugin(ScrollTrigger);

// Category labels shown as filter chips
const CATEGORY_LABELS = {
  all: "Tout",
  protein: "Protéines",
  supplements: "Compléments",
  nutrition: "Nutrition",
  clothing: "Vêtements",
  gloves: "Gants",
  shoes: "Chaussures",
  equipment: "Équipement",
  other: "Autre",
};

const ShopPartners = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { data: products, loading } = usePartnerProducts();
  const { data: settings } = useSiteSettings();
  const [activeCategory, setActiveCategory] = useState("all");

  const safeProducts = Array.isArray(products) ? products : [];
  const hasData = safeProducts.length > 0;

  // Categories actually present in the data
  const availableCategories = useMemo(() => {
    const set = new Set(safeProducts.map((p) => p.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [safeProducts]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return safeProducts;
    return safeProducts.filter((p) => p.category === activeCategory);
  }, [safeProducts, activeCategory]);

  useEffect(() => {
    if (!loading && hasData) {
      gsap.fromTo(
        ".shop-card",
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [loading, hasData, activeCategory]);

  if (loading || !hasData) return null;

  // Resolve phone number for WhatsApp
  const whatsappNumber = settings?.whatsapp?.replace(/[^0-9]/g, "");

  const handleProductClick = (product) => {
    const { ctaType, ctaLink, whatsappMessage, name } = product;

    if (ctaType === "whatsapp" && whatsappNumber) {
      const msg = whatsappMessage || `Bonjour, je souhaite commander : ${name}`;
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
      return;
    }

    if (ctaType === "external" && ctaLink) {
      window.open(ctaLink, "_blank");
      return;
    }

    if (ctaType === "internal" && ctaLink) {
      navigate(ctaLink);
      return;
    }

    // Fallback
    navigate("/contact");
  };

  const getCtaIcon = (type) => {
    if (type === "whatsapp") return <MessageCircle className="w-4 h-4" />;
    if (type === "external") return <ExternalLink className="w-4 h-4" />;
    return <ArrowRight className="w-4 h-4" />;
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gym-bg border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Recommandé par Samurai Nouvelle Madina"
          title="Shop &"
          highlight="Partenaires"
          subtitle="Sélection de produits testés et approuvés par nos coachs. Livraison via nos partenaires."
          number="08"
        />

        {/* Category filter chips */}
        {availableCategories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gym-orange text-gym-bg"
                    : "bg-white/5 text-white/60 hover:text-white border border-gym-border"
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="shop-card group relative bg-gym-bg-light rounded-2xl overflow-hidden border border-gym-border hover:border-gym-orange/40 transition-all duration-500 cursor-pointer flex flex-col"
              onClick={() => handleProductClick(product)}
            >
              {/* Featured badge */}
              {product.featured && (
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-gym-orange text-gym-bg text-[9px] font-bold uppercase tracking-wider">
                  Top pick
                </div>
              )}

              {/* Discount badge */}
              {product.discountLabel && (
                <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-gym-orange text-[9px] font-bold uppercase tracking-wider border border-gym-orange/30 flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  {product.discountLabel}
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-square bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
                <SanityImage
                  source={product.image}
                  alt={product.name}
                  width={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gym-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Brand */}
                {product.brand && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {product.partnerLogo ? (
                      <SanityImage
                        source={product.partnerLogo}
                        alt={product.brand}
                        width={60}
                        className="h-3.5 w-auto object-contain opacity-70"
                      />
                    ) : (
                      <span className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">
                        {product.brand}
                      </span>
                    )}
                  </div>
                )}

                {/* Name */}
                <h3 className="text-white font-semibold text-sm leading-tight mb-2 group-hover:text-gym-orange transition-colors line-clamp-2">
                  {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                  <p className="text-white/40 text-xs leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gym-border">
                  {product.priceLabel ? (
                    <span className="text-gym-orange font-bold text-sm">
                      {product.priceLabel}
                    </span>
                  ) : (
                    <span className="text-white/30 text-xs">Prix en DM</span>
                  )}

                  <div className="flex items-center gap-1.5 text-white/60 group-hover:text-gym-orange text-[11px] font-semibold uppercase tracking-wider transition-colors">
                    {getCtaIcon(product.ctaType)}
                    <span className="hidden sm:inline">
                      {product.ctaLabel || "Commander"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner glow on hover */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gym-orange/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Empty state after filter */}
        {filtered.length === 0 && (
          <p className="text-center text-white/30 py-12">
            Aucun produit dans cette catégorie
          </p>
        )}

        {/* Footer note */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <ShoppingBag className="w-3.5 h-3.5 text-gym-orange" />
            <span>
              Commandes traitées par nos partenaires · Livraison en Tunisie
            </span>
          </div>
          <span className="hidden sm:inline text-white/20">·</span>
          <button
            onClick={() => navigate("/contact")}
            className="text-gym-orange text-xs font-semibold uppercase tracking-wider hover:underline"
          >
            Devenir partenaire
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopPartners;
