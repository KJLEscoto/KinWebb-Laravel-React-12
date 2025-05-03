import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import Shell from "./shell";

function AboutMe() {
  return (
    <Shell>
      <div className='flex flex-col lg:flex-row items-start'>
        <section className="w-1/3">
          <h3 className="text-sm font-bold">About Me</h3>
        </section>

        <section className="lg:w-2/3 w-full tracking-wide space-y-14">
          <p className="text-3xl font-light text-white/50">
            I focus on
            <span className="text-white italic mx-2">minimalist</span>
            design principles, creating clean,
            functional, and user-friendly interfaces that prioritize
            simplicity and usability.
          </p>

          <Button className="rounded-full flex items-center gap-2" size="lg">
            More About Me
            <MoveRight className="size-4" />
          </Button>
        </section>
      </div>
    </Shell>
  )
}

export default AboutMe;