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
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEventHandler, useState } from "react";
import InputError from "../input-error";
import { Textarea } from "../ui/textarea";

type SubmitForm = {
  name: string;
  email: string;
  message: string;
};

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about-me", label: "About Me" },
  {
    href: "https://drive.google.com/file/d/1UsVAtVGbFRgDPO6cB9Zpi7QHpJV4x_iX/view",
    label: "Resumé",
    icon: ArrowUpRight,
  },
];

function ContactForm({ onSubmit, data, setData, errors, processing }: any) {
  return (
    <form className="flex flex-col gap-5 mt-5" onSubmit={onSubmit}>
      <section className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" value={data.name} onChange={(e) => setData("name", e.target.value)} />
        <InputError message={errors.name} />
      </section>

      <section className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
        <InputError message={errors.email} />
      </section>

      <section className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" className="!bg-[#0a0a0a] h-40" value={data.message} onChange={(e) => setData("message", e.target.value)} />
        <InputError message={errors.message} />
      </section>

      <Button
        className="rounded-full flex items-center gap-2 !px-6"
        type="submit"
        disabled={processing || !data.name || !data.email || !data.message}
      >
        Send Message
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}

function NavHeader() {
  const KINWEBB_ICON = import.meta.env.VITE_KINWEBB_ICON;
  const KINWEBB_LOGO = import.meta.env.VITE_KINWEBB_LOGO;

  const [isContactOpen, setIsContactOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm<SubmitForm>({
    name: "",
    email: "",
    message: "",
  });

  const sendMessage: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("send.message"), {
      onSuccess: () => {
        console.log("success");
        reset();
      },
    });
  };

  return (
    <nav className="max-w-5xl mx-auto py-7 px-5 lg:px-0 transition-all duration-500 flex items-center justify-between">
      <Link href={route("home")} className="text-white font-bold text-base">
        {KINWEBB_ICON}
      </Link>

      {/* Desktop */}
      <section className="md:flex hidden items-center gap-8">
        <div className="flex items-center gap-10">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="text-[#A0A0A0] font-medium flex items-center gap-1 text-xs tracking-wide hover:text-white transition"
            >
              {label}
              {Icon && <Icon className="w-4 h-4" />}
            </Link>
          ))}
        </div>

        <Sheet>
          <SheetTrigger>
            <Button size="sm" className="rounded-full text-xs font-bold">
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
      </section>

      {/* Mobile */}
      <section className="md:hidden flex items-center gap-5">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-5 h-5 text-[#A0A0A0] hover:text-white cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="overflow-auto md:hidden" side="top">
            <SheetHeader>
              <SheetTitle>{KINWEBB_LOGO}</SheetTitle>
            </SheetHeader>
            <div className="w-full px-5 pb-5 -mt-5">
              {!isContactOpen ? (
                <>
                  {links.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-[#A0A0A0] font-medium py-3 px-3 flex items-center gap-1 text-xs tracking-wide hover:text-white transition border rounded-full"
                    >
                      {label}
                      {Icon && <Icon className="w-4 h-4" />}
                    </Link>
                  ))}
                  <Button
                    size="sm"
                    className="rounded-full text-xs w-full font-bold mt-3"
                    onClick={() => setIsContactOpen(true)}
                  >
                    Get in Touch
                  </Button>
                </>
              ) : (
                <>
                  <SheetHeader className="!px-0">
                    <SheetTitle>Looking for a Web Developer?</SheetTitle>
                    <SheetDescription>
                      If you have any inquiries, ideas, or just want to say hello, feel free to leave a message — I'll get back to you as soon as possible.
                    </SheetDescription>
                  </SheetHeader>
                  <ContactForm
                    onSubmit={sendMessage}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                  />
                  <Button
                    variant="ghost"
                    className="text-xs mt-5 underline"
                    onClick={() => setIsContactOpen(false)}
                  >
                    Back to Menu
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

      </section>
    </nav>
  );
}

export default NavHeader;
