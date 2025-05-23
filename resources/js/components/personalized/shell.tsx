import clsx from "clsx";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={clsx(
        'flex flex-col gap-10 !max-w-7xl mx-auto h-full xl:p-0 p-5 text-white relative'
      )}>
      {children}
    </section>
  )
}

export default Shell;