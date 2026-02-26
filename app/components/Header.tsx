// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Scale, Menu, X } from "lucide-react";
// import Image from 'next/image';

// import { Playfair_Display } from 'next/font/google';

// const playfair = Playfair_Display({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   style: ['normal', 'italic']
// });


// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="container-custom">
//         <div className="flex justify-between items-center py-1">
         
// <Link href="/" className="flex items-center space-x-3">
//   <Image 
//     src="/logo.png" 
//     alt="Ata-ur-Rahman & Co. Logo" 
//     width={60} 
//     height={60}
//     className="h-16 w-16"
//   />
//   <div className="flex flex-col">
//     <span className={`${playfair.className} text-2xl font-semibold text-gray-900 italic tracking-tight`}>
//       <span className="text-4xl text-primary-700 font-bold italic mr-0.5">A</span>
//       ta-ur-Rahman & Co.
//     </span> 
//     <span className={`${playfair.className} text-lg font-light text-gray-600 italic tracking-wide mt-1`}>
//       Legal Consultants and Advocates
//     </span>
//   </div>
// </Link>
//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             <Link
//               href="/"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Home
//             </Link>
//             <Link
//               href="/services"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Services
//             </Link>
//             <Link
//               href="/team"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Our Team
//             </Link>
//             <Link
//               href="/cases"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Notable Cases
//             </Link>
//             <Link
//               href="/publications"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Publications
//             </Link>
//             <Link
//               href="/shc-cases"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Case Status
//             </Link>

//             <Link
//               href="/contact"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Contact
//             </Link>
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <nav className="flex flex-col space-y-4">
//               <Link
//                 href="/"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/services"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Services
//               </Link>
//               <Link
//                 href="/team"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Our Team
//               </Link>
//               <Link
//                 href="/cases"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Notable Cases
//               </Link>
//               <Link
//                 href="/publications"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Publications
//               </Link>
//               <Link
//                 href="/shc-cases"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Case Status
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Contact
//               </Link>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Scale, Menu, X } from "lucide-react";
// import Image from 'next/image';

// import { Playfair_Display } from 'next/font/google';

// const playfair = Playfair_Display({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   style: ['normal', 'italic']
// });


// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="container-custom">
//         <div className="flex justify-between items-center py-1">
         
// <Link href="/" className="flex items-center space-x-2 md:space-x-3">
//   <div className="relative -mb-4 md:-mb-8">
//     <div className="bg-white rounded-full p-1.5 md:p-4 shadow-md">
//       <Image 
//         src="/logo.png" 
//         alt="Ata-ur-Rahman & Co. Logo" 
//         width={80} 
//         height={80}
//         className="h-16 w-16 md:h-24 md:w-24"
//       />
//     </div>
//   </div>
//   <div className="flex flex-col">
//     <span className={`${playfair.className} text-2xl font-semibold text-gray-900 italic tracking-tight`}>
//       <span className="text-2xl md:text-4xl text-primary-700 font-bold italic mr-0.5">A</span>
//       ta-ur-Rahman & Co.
//     </span> 
//     <span className={`${playfair.className} text-lg font-light text-gray-600 italic tracking-wide mt-1`}>
//       Legal Consultants and Advocates
//     </span>
//   </div>
// </Link>
//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             <Link
//               href="/"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Home
//             </Link>
//             <Link
//               href="/services"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Services
//             </Link>
//             <Link
//               href="/team"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Our Team
//             </Link>
//             <Link
//               href="/cases"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Notable Cases
//             </Link>
//             <Link
//               href="/publications"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Publications
//             </Link>
//             <Link
//               href="/shc-cases"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Case Status
//             </Link>

//             <Link
//               href="/contact"
//               className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//             >
//               Contact
//             </Link>
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <nav className="flex flex-col space-y-4">
//               <Link
//                 href="/"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/services"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Services
//               </Link>
//               <Link
//                 href="/team"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Our Team
//               </Link>
//               <Link
//                 href="/cases"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Notable Cases
//               </Link>
//               <Link
//                 href="/publications"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Publications
//               </Link>
//               <Link
//                 href="/shc-cases"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Case Status
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-gray-700 hover:text-primary-600 font-medium"
//               >
//                 Contact
//               </Link>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";
import { Scale, Menu, X } from "lucide-react";
import Image from 'next/image';

import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap', // Performance optimization for font loading
});


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50" role="banner">
      <div className="container-custom">
        <div className="flex justify-between items-center py-0">

<Link href="/" className="flex items-center space-x-2 md:space-x-3 -mb-0 md:-mb-2">
  <div className="relative -mb-6 md:-mb-10">
    <div className="bg-white rounded-full p-1.5 md:p-4 shadow-md">
      <Image
        src="/logo.png"
        alt="Ata-ur-Rahman & Co. Logo"
        width={80}
        height={80}
        className="h-14 w-14 md:h-24 md:w-24"
        priority // Priority loading for LCP optimization
      />
    </div>
  </div>
  <div className="flex flex-col">
    <span className={`${playfair.className} text-2xl font-semibold text-gray-900 italic tracking-tight`}>
      <span className={`${playfair.className} text-2xl md:text-4xl text-primary-700 font-bold italic mr-0.5`}>A</span>
      ta-ur-Rahman & Co.
    </span>
    <span className={`${playfair.className} text-sm md:text-lg font-light text-gray-600 italic tracking-wide`}>
      Legal Consultants and Advocates
    </span>
  </div>
</Link>
          {/* Desktop Navigation - Semantic nav with aria-label */}
          <nav className="hidden md:flex space-x-8 mr-10" aria-label="Main navigation">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/team"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Our Team
            </Link>
            <Link
              href="/cases"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Notable Cases
            </Link>
            <Link
              href="/publications"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Publications
            </Link>
            <Link
              href="/shc-cases"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Case Status
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button - Accessible with aria-label and aria-expanded */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Semantic nav with aria-label */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-6 px-4 border-t" role="dialog" aria-label="Mobile navigation menu">
            <nav className="flex flex-col space-y-4" aria-label="Mobile main navigation">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/team"
                className="text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Team
              </Link>
              <Link
                href="/cases"
                className="text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Notable Cases
              </Link>
              <Link
                href="/publications"
                className="text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Publications
              </Link>
              <Link
                href="/shc-cases"
                className="text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Case Status
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}