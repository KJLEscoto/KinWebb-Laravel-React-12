import { useEffect, useRef, useState } from "react";
import { Facebook, Github, Linkedin, Waypoints } from "lucide-react"; // Assuming this is the correct import
import gsap from "gsap";
import HyperLogo from "./hyperlogo";
import ToggleClock from "./toggle-clock";
import { usePage } from "@inertiajs/react";
import { SharedData, Social } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function FixedBottom() {

  const { socials } = usePage<SharedData>().props;

  const [showLogos, setShowLogos] = useState(false);
  const [isWaypointClicked, setIsWaypointClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLSpanElement>(null);
  const waypointsRef = useRef<SVGSVGElement>(null); // Use SVGSVGElement to match the expected ref type

  // GSAP animation for the logos and Waypoint to X icon transformation
  useEffect(() => {
    const elements = logosRef.current?.children;

    // Animate logos when they show/hide
    if (showLogos && elements) {
      gsap.fromTo(
        elements,
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.1,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    } else if (!showLogos && elements) {
      gsap.to(elements, {
        y: -10,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in",
      });
    }

    // Animation for transforming Waypoint into X icon with rotation
    if (waypointsRef.current) {
      gsap.fromTo(
        waypointsRef.current,
        { rotation: 0 },
        {
          rotation: isWaypointClicked ? 180 : 0, // Rotate by 180 degrees when clicked
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [showLogos, isWaypointClicked]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowLogos(false);
        setIsWaypointClicked(false); // Reset Waypoint state
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-end justify-between w-full transition-all duration-500 px-5 lg:px-0">
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-3 relative"
      >
        <span
          ref={logosRef}
          className={`flex flex-col gap-3 items-center transition-all duration-300 ${showLogos ? "block" : "hidden"
            }`}
        >
          {socials.map((item: Social) => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger>
                  <HyperLogo logo={item.logo} link={item.link} />
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          ))}
        </span>

        {/* Waypoints component that will transform into X icon */}
        <span className="px-1.5">
          <Waypoints
            ref={waypointsRef}
            className="size-5 cursor-pointer text-white/60 hover:text-white transition"
            onClick={() => {
              setShowLogos((prev) => !prev);
              setIsWaypointClicked((prev) => !prev); // Toggle Waypoint clicked state
            }}
            aria-label={showLogos ? "Close social media links" : "Open social media links"}
          />
        </span>
      </div>

      <ToggleClock />
    </div>
  );
}

export default FixedBottom;
