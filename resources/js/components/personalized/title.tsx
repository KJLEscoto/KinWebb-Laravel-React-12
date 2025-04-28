function Title({ className, title }: { className?: string, title?: string }) {
  return (
    <span className="flex items-center gap-2 select-none opacity-80">
      <div className="h-2.5 w-2.5 bg-white" />
      <h1 className={`${className} text-xl font-bold`}>{title}</h1>
    </span>
  )
}

export default Title;