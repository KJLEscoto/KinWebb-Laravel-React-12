function Image({ className, src, alt }: { className?: string, src?: string, alt?: string }) {
  return <img draggable='false' src={src} alt={alt} className={`w-auto object-cover transition-all duration-500 h-auto select-none ${className}`} />
}

export default Image;