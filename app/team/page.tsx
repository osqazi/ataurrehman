// "use client"
// import Header from '@/app/components/Header';
// import Footer from '@/app/components/Footer';
// import TeamCard from '@/app/components/TeamCard';
// import teamData from '@/app/data/teamMembers.json';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';


// export default function Team() {

//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   });

//   const y = useTransform(scrollYProgress, [0, 0.3, 1], [100, 0, -100]);
//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

//   return (
//     <div className="min-h-screen">
//       <Header />
      
//       {/* Team Header */}
//       <section className="bg-primary-700 text-white">
//         <div className="container-custom section-padding">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Expert Team</h1>
//             <p className="text-xl text-primary-100">
//               Meet our distinguished team of legal experts with decades of combined experience and proven track records.
//             </p>
//           </div>
//         </div>
//       </section>
//        <motion.div
//       ref={ref}
//       style={{ y, opacity }}
//       className="moving-container"
//     >

//       {/* Team Members */}
//       <section className="section-padding bg-gray-50">
//         <div className="container-custom">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {teamData.teamMembers.map((member, index) => (
//               <TeamCard key={index} member={member} />
//             ))}
//           </div>
//         </div>
//       </section>
//       </motion.div>

//       {/* Stats Section */}
//       <section className="section-padding bg-white">
//         <div className="container-custom">
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
//             <div>
//               <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50+</div>
//               <div className="text-gray-600">Years Experience</div>
//             </div>
//             <div>
//               <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">1000+</div>
//               <div className="text-gray-600">Cases Handled</div>
//             </div>
//             <div>
//               <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">9</div>
//               <div className="text-gray-600">Expert Lawyers</div>
//             </div>
//             {/* <div>
//               <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">98%</div>
//               <div className="text-gray-600">Success Rate</div>
//             </div> */}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

"use client"
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import TeamCard from '@/app/components/TeamCard';
import teamData from '@/app/data/teamMembers.json';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TeamT } from '../types/team';

export default function Team() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Team Header */}
      <section className="bg-primary-700 text-white">
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Expert Team</h1>
            <p className="text-xl text-primary-100">
              Meet our distinguished team of legal experts with decades of combined experience and proven track records.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members with Individual Scroll Animations */}
      <section ref={sectionRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamData.teamMembers.map((member, index) => (
              <AnimatedTeamCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600">Cases Handled</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">9</div>
              <div className="text-gray-600">Expert Lawyers</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Separate component for animated cards
function AnimatedTeamCard({ member, index }: { member: TeamT; index: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 + (index * 20), 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        opacity,
        scale
      }}
    >
      <TeamCard member={member} />
    </motion.div>
  );
}