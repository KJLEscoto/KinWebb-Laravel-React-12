function Title({ className, title }: { className?: string, title?: string }) {
  return (
    <span className="flex items-center gap-2 select-none">
      <div className="h-3 w-3 bg-white" />
      <h1 className={`${className} text-xl font-bold`}>{title}</h1>
    </span>

  )

}

export default Title;