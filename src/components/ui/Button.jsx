import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      href,
      onClick,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-extrabold uppercase tracking-[0.12em] transition-all duration-300 rounded-md";

    const variants = {
      // Citrus primary button
      primary:
        "bg-gym-red text-gym-bg hover:bg-gym-red-light hover:shadow-lg hover:shadow-gym-red/20",
      secondary:
        "bg-white/5 text-white border border-gym-border hover:bg-white/10 hover:border-white/30",
      // Outline — citrus border, fills on hover
      outline:
        "bg-transparent text-gym-red border border-gym-red/60 hover:bg-gym-red hover:text-gym-bg",
      ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
      // Light button for high contrast sections
      white:
        "bg-white text-gym-bg hover:bg-white/90 hover:shadow-lg hover:shadow-white/20",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
      xl: "px-10 py-5 text-lg",
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} onClick={onClick} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
