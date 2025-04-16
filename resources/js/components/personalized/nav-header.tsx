import { Link, useForm } from "@inertiajs/react";
import { ArrowUpRight, Menu, Send } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEventHandler, useState } from "react";
import InputError from "../input-error";
import { Textarea } from "../ui/textarea";

type SubmitForm = {
  name: string;
  email: string;
  message: string;
}

function NavHeader() {
  const KINWEBB_ICON = import.meta.env.VITE_KINWEBB_ICON;
  const KINWEBB_LOGO = import.meta.env.VITE_KINWEBB_LOGO;

  const links = [
    {
      href: '/projects',
      label: 'Projects',
      hasIcon: false,
      icon: null
    },
    {
      href: '/about-me',
      label: 'About Me',
      hasIcon: false,
      icon: null
    },
    {
      href: 'https://drive.google.com/file/d/1UsVAtVGbFRgDPO6cB9Zpi7QHpJV4x_iX/view',
      label: 'Resumé',
      hasIcon: true,
      icon: ArrowUpRight
    },
  ]

  const { data, setData, post, processing, errors, reset } = useForm<SubmitForm>({
    name: '',
    email: '',
    message: '',
  });

  const sendMessage: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('send.message'), {
      onSuccess: () => {
        console.log('success');
        reset();
      }
    });
  };

  return (
    <nav className='w-full py-7 px-5 lg:px-0 transition-all duration-500 flex items-center justify-between'>
      <Link href={route('home')} className='text-white font-bold text-sm'>{KINWEBB_ICON}</Link>

      {/* desktop menu */}
      <section className='md:flex hidden items-center gap-8'>
        <div className='flex items-center gap-10'>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-[#A0A0A0] font-medium flex items-center gap-1 text-xs tracking-wide hover:text-white transition'
            >
              {link.label}
              {link.hasIcon && link.icon && (
                <link.icon className='w-4 h-4' />
              )}
            </Link>
          ))}
        </div>

        <Sheet>
          <SheetTrigger>
            <Button size='sm' className='rounded-full text-xs font-bold'>
              Get in Touch
            </Button>
          </SheetTrigger>

          <SheetContent className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Looking for a Web Developer?</SheetTitle>
              <SheetDescription>
                If you have any inquiries, ideas, or just want to say hello, feel
                free to leave a message — I'll get back to you as soon as
                possible.
              </SheetDescription>
              <form className='flex flex-col gap-5 mt-5' onSubmit={sendMessage}>
                <section className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                  <InputError message={errors.name} />
                </section>

                <section className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                  <InputError message={errors.email} />
                </section>

                <section className="flex flex-col gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea className="!bg-[#0a0a0a] h-40" id="message" value={data.message} onChange={(e) => setData('message', e.target.value)} />
                  <InputError message={errors.message} />
                </section>

                <section>
                  <Button className="rounded-full flex items-center gap-2 !px-6" type="submit" disabled={processing || !data.name || !data.email || !data.message}>
                    Send Message
                    <Send className="w-4 h-4" />
                  </Button>
                </section>
              </form>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </section>

      {/* mobile menu */}
      <section className="md:hidden flex items-center gap-5">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 text-[#A0A0A0] hover:text-white cursor-pointer" />
          </SheetTrigger>

          <SheetContent className="overflow-auto md:hidden" side="top">
            <SheetHeader>
              <SheetTitle>{KINWEBB_LOGO}</SheetTitle>
            </SheetHeader>
            <div className="w-full px-5 pb-5 -mt-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-[#A0A0A0] font-medium py-3 px-3 flex items-center gap-1 text-xs tracking-wide hover:text-white transition'
                >
                  {link.label}
                  {link.hasIcon && link.icon && (
                    <link.icon className='w-4 h-4' />
                  )}
                </Link>
              ))}

              <Sheet>
                <SheetTrigger className="w-full mt-3">
                  <Button size='sm' className='rounded-full text-xs w-full font-bold'>
                    Get in Touch
                  </Button>
                </SheetTrigger>

                <SheetContent className="overflow-auto">
                  <SheetHeader>
                    <SheetTitle>Looking for a Web Developer?</SheetTitle>
                    <SheetDescription>
                      If you have any inquiries, ideas, or just want to say hello, feel
                      free to leave a message — I'll get back to you as soon as
                      possible.
                    </SheetDescription>
                    <form className='flex flex-col gap-5 mt-5' onSubmit={sendMessage}>
                      <section className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                      </section>

                      <section className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        <InputError message={errors.email} />
                      </section>

                      <section className="flex flex-col gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea className="!bg-[#0a0a0a] h-40" id="message" value={data.message} onChange={(e) => setData('message', e.target.value)} />
                        <InputError message={errors.message} />
                      </section>

                      <section>
                        <Button className="rounded-full flex items-center gap-2 !px-6" type="submit" disabled={processing || !data.name || !data.email || !data.message}>
                          Send Message
                          <Send className="w-4 h-4" />
                        </Button>
                      </section>
                    </form>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </nav>
  )
}

export default NavHeader;