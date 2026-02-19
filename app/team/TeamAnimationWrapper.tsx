"use client";
/**
 * TeamAnimationWrapper Component
 * 
 * Client-side wrapper for team card animations.
 * This is separated from the main page to allow metadata export.
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TeamCard from '@/app/components/TeamCard';
import { TeamT } from '../types/team';

interface TeamAnimationWrapperProps {
  member: TeamT;
  index: number;
}

export default function TeamAnimationWrapper({ member, index }: TeamAnimationWrapperProps) {
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
