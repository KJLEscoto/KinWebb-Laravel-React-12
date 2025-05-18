export default function Experiences() {

  return (
    <div className='grid grid-cols-2 gap-10'>
      <h1 className="italic font-light text-3xl text-white/60">Experiences</h1>

      <div className='space-y-10'>
        <section className='space-y-3'>
          <h3 className='text-lg'>INTERN @
            <a target='_blank' href='https://rwebsolutions.com.ph/' className='underline mx-1 cursor-pointer underline-offset-5 hover:text-blue-500 transition'>R Web Solutions, Corp.</a>
          </h3>
          <ul className='list-disc list-inside'>
            <li className='ml-3 font-light text-white/70 tracking-wide'>Build dynamic & responsive websites application</li>
          </ul>
        </section>
      </div>
    </div>
  )
}