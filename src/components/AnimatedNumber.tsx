"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
    value: number;
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    format?: boolean;
}

export default function AnimatedNumber({
    value,
    duration = 2,
    className = "",
    prefix = "",
    suffix = "",
    format = true
}: AnimatedNumberProps) {
    const springValue = useSpring(0, {
        mass: 1,
        stiffness: 100,
        damping: 30,
    });

    const displayValue = useTransform(springValue, (latest) => {
        const num = Math.floor(latest);
        return format ? num.toLocaleString() : num.toString();
    });

    useEffect(() => {
        springValue.set(value);
    }, [value, springValue]);

    return (
        <span className={className}>
            {prefix}
            <motion.span>{displayValue}</motion.span>
            {suffix}
        </span>
    );
}
