function SectionHeading({
  subtitle,
  title,
  description,
  center = true,
  className = "",
}) {
  return (
    <div
      className={`reveal max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#3B82F6] sm:text-xs sm:tracking-[0.4em]">
        {subtitle}
      </p>

      <h2 className="mt-3 text-3xl font-bold leading-[1.15] text-white sm:mt-4 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-7 text-[#94A3B8] sm:mt-5 sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
