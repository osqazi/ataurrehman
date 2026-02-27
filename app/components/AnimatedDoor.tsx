// "use client";

// import { useEffect, useState } from "react";

// export default function AnimatedDoor() {
//   const [isVisible, setIsVisible] = useState(true);
//   const [animationStarted, setAnimationStarted] = useState(false);
//   const [bgFade, setBgFade] = useState(false);

//   useEffect(() => {
//     // 1️⃣ Start text animation after 2s
//     const textTimer = setTimeout(() => {
//       setAnimationStarted(true);
//     }, 2000);

//     // 2️⃣ After text animation completes (1.5s), fade background
//     const bgTimer = setTimeout(() => {
//       setBgFade(true);
//     }, 3500); // 2000 + 1500

//     // 3️⃣ Remove component after background fade
//     const removeTimer = setTimeout(() => {
//       setIsVisible(false);
//     }, 5000); // 3500 + 1500

//     return () => {
//       clearTimeout(textTimer);
//       clearTimeout(bgTimer);
//       clearTimeout(removeTimer);
//     };
//   }, []);

//   if (!isVisible) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center 
//       bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm 
//       overflow-hidden"
//       style={{
//         opacity: bgFade ? 0 : 1,
//         transition: "opacity 1.5s ease-in-out",
//       }}
//     >
//       <div
//         style={{
//           position: "relative",
//           zIndex: 10,
//           textAlign: "center",
//           opacity: animationStarted ? 0 : 1,
//           transform: animationStarted ? "scale(0.9)" : "scale(1)",
//           transition: "all 1.5s ease-in-out",
//         }}
//       >
//         <h1 className="text-5xl font-bold text-white mb-4 font-serif">
//           Ata-ur-Rahman & Co.
//         </h1>
//         <p className="text-amber-200 text-2xl">
//           Advocates | Legal Consultants
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";
import logo from "/public/logo.png";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AnimatedDoor() {
  const [isVisible, setIsVisible] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [bgFade, setBgFade] = useState(false);

  useEffect(() => {
    const startDelay = 1000;
    const rotationDuration = 4000; // 4 seconds spin

    const textTimer = setTimeout(() => {
      setAnimationStarted(true);
    }, startDelay);

    const bgTimer = setTimeout(() => {
      setBgFade(true);
    }, startDelay + rotationDuration);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, startDelay + rotationDuration + 1500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(bgTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm"
      style={{
        opacity: bgFade ? 0 : 1,
        transition: "opacity 1.5s ease-in-out",
        perspective: "1200px",
      }}
    >
      <div
        className="flex flex-col items-center text-center space-y-4"
        style={{
          transformStyle: "preserve-3d",
          opacity: animationStarted ? 0 : 1,
          transform: animationStarted
            ? "rotateY(1800deg) scale(0.85)" // 5 full spins
            : "rotateY(0deg) scale(1)",
          transition: "transform 5s ease-in-out, opacity 5s ease-in-out",
        }}
      >
        <Image
          src={logo}
          alt="Company Logo"
          width={220}
          height={220}
          priority
        />

        <p className="text-white text-xl font-light tracking-wide">
          Advocates | Legal Consultants
        </p>
      </div>
    </div>
  );
}