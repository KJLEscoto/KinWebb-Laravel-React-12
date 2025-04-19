import { useEffect, useState } from "react";
import { Facebook, Github, Linkedin } from "lucide-react";
import HyperLogo from "./hyperlogo";

const hyperlogos = [
  {
    Icon: Facebook,
    url: "https://www.facebook.com/kentoy.newt",
  },
  {
    Icon: Linkedin,
    url: "https://www.linkedin.com/in/kent-joemar-escoto-646b92265/",
  },
  {
    Icon: Github,
    url: "https://github.com/KJLEscoto",
  },
];

function FixedBottom() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila",
      };
      const formatter = new Intl.DateTimeFormat("en-PH", options);
      setTime(formatter.format(date));
    };

    updateTime(); // set initial time
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // clean up
  }, []);

  return (
    <div className="flex items-center justify-between w-full transition-all duration-500 px-5 lg:px-0">
      <section className="flex gap-5 items-center">
        {hyperlogos.map((logo, index) => (
          <HyperLogo key={index} Icon={logo.Icon} url={logo.url} />
        ))}
      </section>

      <section>
        <p className="text-sm select-none font-extralight text-white">
          PH - {time} (GMT+8)
        </p>
      </section>
    </div>
  );
}

export default FixedBottom;
