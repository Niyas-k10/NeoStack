import { getLenis } from "../../hooks/useLenis";

function Button({
  children,
  variant = "primary",
  type = "button",
  href,
  className = "",
  onClick,
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[13px] font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD] sm:px-6 sm:py-3 sm:text-sm";

  const variants = {
    primary:
      "bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:shadow-[0_0_0_4px_rgba(59,130,246,0.16)] active:scale-[0.98]",
    secondary:
      "border border-white/[0.1] bg-white/[0.03] text-white hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.98]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  const handleClick = (event) => {
    onClick?.(event);

    if (!href?.startsWith("#")) return;

    event.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = getLenis();
    const offset = -72;

    if (lenis) {
      lenis.scrollTo(el, { offset, duration: 1.1 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (href) {
    return (
      <a href={href} className={classes} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
