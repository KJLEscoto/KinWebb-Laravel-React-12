function Image({ className, src }: { className?: string, src?: string }) {
  return <img draggable='false' src={src} className={`w-auto transition-all duration-500 h-auto ${className}`} />
}

export default Image;