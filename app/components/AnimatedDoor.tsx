"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AnimatedDoor() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
      
      // Remove component after animation completes
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      
      return () => clearTimeout(removeTimer);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900">
      
      {/* Left Door Half - using left-door.png */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 transition-transform duration-5000 ease-out ${
          isAnimating ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <Image
          src="/left-door.png" // Pre-split left half
          alt="Left door"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Door Half - using right-door.png */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 transition-transform duration-5000 ease-out ${
          isAnimating ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <Image
          src="/right-door.png" // Pre-split right half
          alt="Right door"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Brand Text */}
      <div
        className={`relative z-10 text-center transition-all duration-5000 ${
          isAnimating ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      >
        <h1 className="text-5xl font-bold text-white mb-4 font-serif">
          Ata-ur-Rehman & Co.
        </h1>
        <p className="text-amber-200 text-2xl">
          Advocates | Legal Consultants
        </p>
      </div>

    </div>
  );
}