import { urlFor } from "../../lib/image";

const SanityImage = ({
  source,
  alt = "",
  width = 800,
  height,
  className = "",
  loading = "lazy",
  ...props
}) => {
  if (!source) {
    return (
      <div
        className={`bg-white/5 flex items-center justify-center ${className}`}
        aria-label={alt}
      >
        <span className="text-white/20 text-xs">No image</span>
      </div>
    );
  }

  let urlBuilder = urlFor(source).width(width).auto("format").quality(80);
  if (height) urlBuilder = urlBuilder.height(height).fit("crop");

  return (
    <img
      src={urlBuilder.url()}
      alt={alt}
      loading={loading}
      className={className}
      {...props}
    />
  );
};

export default SanityImage;
