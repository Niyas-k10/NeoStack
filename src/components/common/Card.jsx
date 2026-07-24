function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-[#111827]/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#3B82F6]/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] sm:rounded-3xl sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
