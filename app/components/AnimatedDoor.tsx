// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function AnimatedDoor() {
//   const [isVisible, setIsVisible] = useState(true);
//   const [animationStarted, setAnimationStarted] = useState(false);

//   useEffect(() => {
//     // Start animation after component mounts
//     const timer = setTimeout(() => {
//       console.log("Starting animation");
//       setAnimationStarted(true);
      
//       // Remove component after animation completes
//       const removeTimer = setTimeout(() => {
//         console.log("Removing component");
//         setIsVisible(false);
//       }, 2100); // Slightly longer than animation
      
//       return () => clearTimeout(removeTimer);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (!isVisible) {
//     console.log("Component hidden");
//     return null;
//   }

//   return (
//    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm overflow-hidden">
      
//       {/* Left Door Half */}
//       {/* <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           bottom: 0,
//           left: 0,
//           width: '50%',
//           transform: animationStarted ? 'translateX(-100%)' : 'translateX(0)',
//           transition: 'transform 1.5s ease-in-out',
//         }}
//       >
//         <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//           <Image
//             src="/left-door.png"
//             alt="Left door"
//             fill
//             style={{ objectFit: 'cover' }}
//             priority
//           />
//         </div>
//       </div> */}

//       {/* Right Door Half */}
//       {/* <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           bottom: 0,
//           right: 0,
//           width: '50%',
//           transform: animationStarted ? 'translateX(100%)' : 'translateX(0)',
//           transition: 'transform 1.5s ease-in-out',
//         }}
//       >
//         <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//           <Image
//             src="/right-door.png"
//             alt="Right door"
//             fill
//             style={{ objectFit: 'cover' }}
//             priority
//           />
//         </div>
//       </div> */}

//       {/* Brand Text */}
//       <div
//         style={{
//           position: 'relative',
//           zIndex: 10,
//           textAlign: 'center',
//           opacity: animationStarted ? 0 : 1,
//           transform: animationStarted ? 'scale(0.9)' : 'scale(1)',
//           transition: 'all 1.5s ease-in-out',
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

import { useEffect, useState } from "react";

export default function AnimatedDoor() {
  const [isVisible, setIsVisible] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [bgFade, setBgFade] = useState(false);

  useEffect(() => {
    // 1️⃣ Start text animation after 2s
    const textTimer = setTimeout(() => {
      setAnimationStarted(true);
    }, 2000);

    // 2️⃣ After text animation completes (1.5s), fade background
    const bgTimer = setTimeout(() => {
      setBgFade(true);
    }, 3500); // 2000 + 1500

    // 3️⃣ Remove component after background fade
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 3500 + 1500

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
      bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm 
      overflow-hidden"
      style={{
        opacity: bgFade ? 0 : 1,
        transition: "opacity 1.5s ease-in-out",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          opacity: animationStarted ? 0 : 1,
          transform: animationStarted ? "scale(0.9)" : "scale(1)",
          transition: "all 1.5s ease-in-out",
        }}
      >
        <h1 className="text-5xl font-bold text-white mb-4 font-serif">
          Ata-ur-Rahman & Co.
        </h1>
        <p className="text-amber-200 text-2xl">
          Advocates | Legal Consultants
        </p>
      </div>
    </div>
  );
}