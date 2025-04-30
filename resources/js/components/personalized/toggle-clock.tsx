import { useEffect, useRef, useState } from "react";
import { Watch } from "lucide-react";
import gsap from "gsap";
import { getFormattedTime } from "@/lib/utils";

function ToggleClock() {
  const [showTime, setShowTime] = useState(false);
  const [time, setTime] = useState("");
  const watchRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Update time every second
  useEffect(() => {
    const updateTime = () => setTime(getFormattedTime());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Retrieve saved state and textWidth from localStorage
    const savedState = localStorage.getItem("clockOpen");
    const savedWidth = localStorage.getItem("watchWidth");

    const textWidth = savedWidth ? parseFloat(savedWidth) : textRef.current?.offsetWidth || 0;

    // Ensure the watch icon is placed correctly after page reload
    if (savedState === "true") {
      setShowTime(true);
      gsap.set(watchRef.current, { right: textWidth }); // Use saved textWidth
      gsap.set(textRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
    }
  }, []);

  const toggleTime = () => {
    const timeline = gsap.timeline({
      defaults: { duration: 0.4, ease: "power2.inOut" },
    });

    const textWidth = textRef.current?.offsetWidth || 0;

    if (!showTime) {
      setShowTime(true);
      localStorage.setItem("clockOpen", "true");
      localStorage.setItem("watchWidth", textWidth.toString()); // Save the width in localStorage
      timeline
        .to(watchRef.current, { right: textWidth }) // Dynamically set the position based on text width
        .to(
          textRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
          },
          "-=0.4"
        );
    } else {
      localStorage.setItem("clockOpen", "false");
      timeline
        .to(textRef.current, {
          clipPath: "inset(0% 0% 0% 100%)",
        })
        .to(
          watchRef.current,
          { right: 0 },
          "-=0.4"
        )
        .add(() => setShowTime(false));
    }
  };

  return (
    <div
      className="relative flex items-center select-none text-white font-light text-sm tracking-wider w-full h-6 overflow-hidden"
    >
      {/* Text hidden initially, revealed by clipPath */}
      <div
        ref={textRef}
        className="absolute right-0 top-0 h-full flex items-center"
        style={{
          clipPath: "inset(0% 0% 0% 100%)",
        }}
      >
        <span>
          PH - {time} <span className="text-[9px]">(GMT+8)</span>
        </span>
      </div>

      {/* Watch icon: initially right-0, animated to right-5 */}
      <div
        ref={watchRef}
        className="absolute top-1/2 -translate-y-1/2 z-10 mr-1"
        style={{ right: 0, position: "absolute" }}
      >
        <Watch
          onClick={toggleTime}
          className="size-4 text-white/70 hover:text-white cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ToggleClock;
