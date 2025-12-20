"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HeadingUnderline,
  SwirlUnderline,
  WavyUnderline,
  HeartUnderline,
} from "./HeadingUnderline";

type UnderlineType = "default" | "swirl" | "wavy" | "heart";
type Align = "left" | "center" | "right";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  underlineType?: UnderlineType;
  color?: string;
  align?: Align;
  center?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  underlineType = "default",
  color = "var(--primary)",
  center = true,
  align,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}) => {
  const UnderlineComponent = {
    default: HeadingUnderline,
    swirl: SwirlUnderline,
    wavy: WavyUnderline,
    heart: HeartUnderline,
  }[underlineType];

  const resolvedAlign: Align = align ?? (center ? "center" : "left");

  const textAlignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[resolvedAlign];

  const flexAlignClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[resolvedAlign];

  const subtitleAlignClass = {
    left: "",
    center: "mx-auto",
    right: "ml-auto",
  }[resolvedAlign];

  return (
    <div className={`${textAlignClass} ${className} `}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-4xl md:text-5x mb-4 font-pacifico ${titleClassName}`}
        style={color ? { color } : {}}
      >
        {title}
      </motion.h2>

      <div className={`flex ${flexAlignClass}`}>
        <UnderlineComponent
          color={color}
          className="mb-6"
          animate={true}
          width="300vw"
        />
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-lg text-gray-600 max-w-2xl mb-8 ${subtitleAlignClass} ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
