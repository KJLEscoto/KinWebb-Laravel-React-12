import { Link, useForm, usePage } from "@inertiajs/react";
import { ArrowUpRight, Menu, Send } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEventHandler, useState } from "react";
import InputError from "../input-error";
import { Textarea } from "../ui/textarea";
import Image from "./image";
import { ResumeLink } from "@/types";

type SubmitForm = {
  name: string;
  email: string;
  message: string;
};

function ContactForm({ onSubmit, data, setData, errors, processing }: any) {

  return (
    <form className="flex flex-col gap-5 mt-5" onSubmit={onSubmit}>
      <section className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input required id="name" type="text" value={data.name} onChange={(e) => setData("name", e.target.value)} />
        <InputError message={errors.name} />
      </section>

      <section className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input required id="email" type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
        <InputError message={errors.email} />
      </section>

      <section className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea required id="message" className="bg-transparent dark:!bg-[#0a0a0a] h-40" value={data.message} onChange={(e) => setData("message", e.target.value)} />
        <InputError message={errors.message} />
      </section>

      <div>
        <Button
          className="rounded-full flex items-center gap-2 !px-6"
          type="submit"
          disabled={processing}
        >
          Send Message
          <Send className="size-4" />
        </Button>
      </div>
    </form>
  );
}

function NavHeader() {
  const { resume } = usePage<ResumeLink>().props;
  const resume_link = resume?.resume_link?.trim() || '#';

  const page = usePage();

  const links = [
    { href: "/", label: "Home", icon: null, new_tab: false },
    { href: "/projects", label: "Projects", icon: null, new_tab: false },
    { href: "/about-me", label: "About Me", icon: null, new_tab: false },
    {
      href: resume_link?.trim() || "#",
      label: "Resumé",
      icon: ArrowUpRight,
      new_tab: !!resume_link,
    },
  ];

  // filter links based on conditions
  const visibleLinks = links.filter((link) => {
    // Don't include resume if href is '#'
    if (link.href === "#") return false;

    return true;
  });

  const KINWEBB_LOGO = import.meta.env.VITE_KINWEBB_LOGO;

  const [isWebSheetOpen, setIsWebSheetOpen] = useState(false);
  const [isMobSheetOpen, setIsMobSheetOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm<SubmitForm>({
    name: "",
    email: "",
    message: "",
  });

  const sendMessage: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("message.store"), {
      onSuccess: () => {
        reset()
        setIsWebSheetOpen(false)
        setIsMobSheetOpen(false)
      },
    });
  };

  return (
    <nav className="py-5 max-w-7xl mx-auto px-5 xl:px-0 transition-all duration-500 flex items-center justify-between">
      <Link href={route("home")} className="text-white font-bold text-base">
        <Image className="!w-10" src='/images/KinWebb_Icon_White.png' alt="kinwebb_icon" />
      </Link>

      {/* Desktop */}
      <section className="md:flex hidden items-center gap-8">
        <div className="flex items-center gap-10">
          {visibleLinks.map(({ href, new_tab, label, icon: Icon }) => {
            const isActive = href === "/" ? page.url === "/" : page.url.startsWith(href);

            return new_tab ? (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A0A0A0] font-medium flex items-center gap-1 text-xs tracking-wide hover:text-white transition"
              >
                {label}
                {Icon && <Icon className="size-4" />}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className={`relative font-medium flex items-center gap-1 text-xs tracking-wide hover:text-white transition ${isActive ? "text-white" : "text-[#A0A0A0]"
                  }`}
              >
                {label}
                {Icon && <Icon className="size-4" />}
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white absolute left-1/2 -translate-x-1/2 -bottom-2.5"></div>
                )}
              </Link>
            );
          })}

        </div>

        <Sheet open={isWebSheetOpen} onOpenChange={setIsWebSheetOpen}>
          <SheetTrigger asChild>
            <Button size="sm" className="rounded-full text-xs font-bold">
              Get in Touch
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Looking for a Web Developer?</SheetTitle>
              <SheetDescription>
                If you have any inquiries or ideas, feel free to leave a message — I'll get back to you as soon as possible.
              </SheetDescription>
              <ContactForm onSubmit={sendMessage} data={data} setData={setData} errors={errors} processing={processing} />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </section>

      {/* Mobile */}
      <section className="md:hidden flex items-center gap-5">
        <Sheet open={isMobSheetOpen} onOpenChange={setIsMobSheetOpen}>
          <SheetTrigger>
            <Menu className="size-5 text-[#A0A0A0] hover:text-white cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="overflow-auto max-h-80 md:hidden" side="top">
            <SheetHeader>
              <SheetTitle>
                <Link href={route("home")}>
                  {KINWEBB_LOGO}
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="w-full px-5 pb-5 -mt-5">

              {visibleLinks.map(({ href, new_tab, label, icon: Icon }) => {
                const isActive = href === "/" ? page.url === "/" : page.url.startsWith(href);

                return new_tab ? (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A0A0A0] font-medium py-3 px-3 flex items-center gap-1 text-xs tracking-wide hover:text-white transition"
                  >
                    {label}
                    {Icon && <Icon className="size-4" />}
                  </a>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className={`text-[#A0A0A0] font-medium py-3 px-3 flex items-center gap-1 text-xs tracking-wide hover:text-white transition relative ${isActive ? 'text-white bg-white/10 rounded-full' : 'text-[#A0A0A0]'
                      }`}
                  >
                    {label}
                    {Icon && <Icon className="size-4" />}
                  </Link>
                );
              })}
              <Sheet>
                <SheetTrigger asChild className="w-full mt-3">
                  <Button size="sm" className="rounded-full text-xs w-full font-bold">
                    Get in Touch
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-auto">
                  <SheetHeader>
                    <SheetTitle>Looking for a Web Developer?</SheetTitle>
                    <SheetDescription>
                      If you have any inquiries, ideas, or just want to say hello, feel free to leave a message — I'll get back to you as soon as possible.
                    </SheetDescription>
                    <ContactForm onSubmit={sendMessage} data={data} setData={setData} errors={errors} processing={processing} />
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </nav>
  );
}

export default NavHeader;
