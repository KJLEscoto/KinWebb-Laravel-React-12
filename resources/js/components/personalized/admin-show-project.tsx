function Section({ header, children }: { header: string, children: React.ReactNode }) {
  return (
    <section className='space-y-2 w-full'>
      <p className='opacity-70 font-light'>{header}</p>
      {children}
    </section>
  )
}

export default Section;