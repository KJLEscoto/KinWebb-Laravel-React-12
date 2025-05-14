import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import Shell from "./shell";
import { Link } from "@inertiajs/react";
import { ShortAbout } from "@/types";

function AboutMe({ short }: { short: ShortAbout }) {
  const body = short?.body;
  const highlight = short?.highlight;

  const regex = new RegExp(`\\b${highlight}\\b`, "gi");

  const text = body
    ? body.replace(
      regex,
      `<span class="text-white italic mx-1.5">${highlight}</span>`
    )
    : "";

  return (
    <Shell>
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <section className="lg:w-1/3">
          <h3 className="text-sm font-bold">About Me</h3>
        </section>

        <section className="lg:w-2/3 w-full tracking-wide space-y-14">
          <div className="text-3xl font-light text-white/50">
            {body ? (
              <div dangerouslySetInnerHTML={{ __html: text }} />
            ) : (
              <div>Coming Soon...</div>
            )}
          </div>

          <Link href="/about-me" className="w-fit block">
            <Button className="rounded-full flex items-center gap-2" size="lg">
              More About Me
              <MoveRight className="size-4" />
            </Button>
          </Link>
        </section>
      </div>
    </Shell>
  );
}

export default AboutMe;
