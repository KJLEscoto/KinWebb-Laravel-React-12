import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import Shell from "./shell";
import { Link, usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import { highlightText } from "@/lib/utils";

function AboutMe() {
  const { short } = usePage<SharedData>().props;

  const content = short?.body ? highlightText(short.body, short.highlight ?? '') : null;

  return (
    <Shell>
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <section className="lg:w-1/3">
          <h3 className="text-sm font-bold">About Me</h3>
        </section>

        <section className="lg:w-2/3 w-full tracking-wide space-y-14">
          {
            content ? (
              <p className="text-3xl font-light text-white/50" dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className="text-white/50">Coming Soon...</p>
            )
          }

          <Link href="/about-me" className="w-fit block">
            <Button className="rounded-full flex font-bold items-center gap-2" size="lg">
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
