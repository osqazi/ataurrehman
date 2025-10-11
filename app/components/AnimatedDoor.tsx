"use client";

import { useEffect, useState } from "react";
import { Scale } from "lucide-react";

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
      }, 2000); // Total animation duration

      return () => clearTimeout(removeTimer);
    }, 500); // Initial delay

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900">
      {/* Left Door */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-amber-900 border-r-4 border-amber-700 flex items-center justify-end pr-8 transition-transform duration-8000 ease-out ${
          isAnimating ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(90deg, 
              rgba(120, 53, 15, 0.8) 0%, 
              rgba(180, 83, 9, 0.9) 20%, 
              rgba(146, 64, 14, 0.8) 40%,
              rgba(120, 53, 15, 0.9) 60%,
              rgba(180, 83, 9, 0.8) 80%,
              rgba(146, 64, 14, 0.9) 100%
            )
          `,
          boxShadow: "inset -10px 0 20px rgba(0,0,0,0.3)"
        }}
      >
        {/* Wood grain texture effect */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-1 bg-amber-800 rounded-full"
              style={{
                top: `${i * 5}%`,
                transform: `rotate(${Math.sin(i) * 2}deg)`,
                opacity: 0.3 + Math.random() * 0.4
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Door */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-amber-900 border-l-4 border-amber-700 flex items-center justify-start pl-8 transition-transform duration-8000 ease-out ${
          isAnimating ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(270deg, 
              rgba(120, 53, 15, 0.8) 0%, 
              rgba(180, 83, 9, 0.9) 20%, 
              rgba(146, 64, 14, 0.8) 40%,
              rgba(120, 53, 15, 0.9) 60%,
              rgba(180, 83, 9, 0.8) 80%,
              rgba(146, 64, 14, 0.9) 100%
            )
          `,
          boxShadow: "inset 10px 0 20px rgba(0,0,0,0.3)"
        }}
      >
        {/* Wood grain texture effect */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-1 bg-amber-800 rounded-full"
              style={{
                top: `${i * 5}%`,
                transform: `rotate(${Math.cos(i) * 2}deg)`,
                opacity: 0.3 + Math.random() * 0.4
              }}
            />
          ))}
        </div>
      </div>

      {/* Scale of Justice - Centered */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-10000 ${
          isAnimating ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      >
        <div className="relative">
          {/* Scale Base */}
          <div className="w-24 h-2 bg-gray-300 rounded-full mb-8 mx-auto"></div>
          
          {/* Scale Stand */}
          <div className="absolute left-1/2 top-0 w-1 h-16 bg-gray-400 -translate-x-1/2"></div>
          
          {/* Scale Beam */}
          <div className="absolute top-8 left-1/2 w-20 h-1 bg-gray-400 -translate-x-1/2 flex justify-between">
            {/* Left Scale */}
            <div className="w-8 h-8 bg-gold rounded-full border-2 border-amber-500 relative -top-4">
              <div className="absolute inset-1 border-2 border-amber-600 rounded-full"></div>
            </div>
            
            {/* Right Scale */}
            <div className="w-8 h-8 bg-gold rounded-full border-2 border-amber-500 relative -top-4">
              <div className="absolute inset-1 border-2 border-amber-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-white mb-2 font-serif">
            Justice Awaits
          </h2>
          <p className="text-amber-200 text-lg">
            Ata-ur-Rehman & Co.
          </p>
        </div>
      </div>

      {/* Door Handles */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-500 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Left Handle */}
        <div className="absolute -left-6 w-6 h-12">
          <div className="w-2 h-8 bg-amber-200 rounded-full absolute left-2 top-2"></div>
          <div className="w-4 h-1 bg-amber-200 rounded-full absolute left-1 top-4"></div>
        </div>
        
        {/* Right Handle */}
        <div className="absolute -right-6 w-6 h-12">
          <div className="w-2 h-8 bg-amber-200 rounded-full absolute right-2 top-2"></div>
          <div className="w-4 h-1 bg-amber-200 rounded-full absolute right-1 top-4"></div>
        </div>
      </div>
    </div>
  );
}