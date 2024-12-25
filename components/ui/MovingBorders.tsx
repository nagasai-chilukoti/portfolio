"use client";
import React, { useRef } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useTransform,
} from "framer-motion";
import { cn } from "@/utils/cn";

// Typing the props properly
interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
    borderRadius?: string;
    children: React.ReactNode;
    as?: React.ElementType;  // Accepts any React component type (e.g., button, div, etc.)
    containerClassName?: string;
    borderClassName?: string;
    duration?: number;
    className?: string;
}

export function Button({
    borderRadius = "1.75rem",
    children,
    as: Component = "button",  // Default to button element
    containerClassName,
    borderClassName,
    duration,
    className,
    ...otherProps
}: ButtonProps) {
    return (
        <Component
            className={cn(
                "bg-transparent relative text-xl  md:col-span-2 p-[1px] overflow-hidden ",
                containerClassName
            )}
            style={{
                borderRadius: borderRadius,
            }}
            {...otherProps}
        >
            <div
                className="absolute inset-0"
                style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
            >
                <MovingBorder duration={duration} rx="30%" ry="30%">
                    <div
                        className={cn(
                            "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]",
                            borderClassName
                        )}
                    />
                </MovingBorder>
            </div>

            <div
                className={cn(
                    "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
                    className
                )}
                style={{
                    borderRadius: `calc(${borderRadius} * 0.96)`,
                }}
            >
                {children}
            </div>
        </Component>
    );
}

interface MovingBorderProps extends React.SVGProps<SVGSVGElement> {
    children: React.ReactNode;
    duration?: number;
    rx?: string;
    ry?: string;
}

export const MovingBorder = ({
    children,
    duration = 2000,
    rx,
    ry,
    ...otherProps
}: MovingBorderProps) => {
    const pathRef = useRef<SVGRectElement | null>(null); // Updated ref type
    const progress = useMotionValue<number>(0);

    useAnimationFrame((time) => {
        const length = pathRef.current?.getTotalLength();
        if (length) {
            const pxPerMillisecond = length / duration;
            progress.set((time * pxPerMillisecond) % length);
        }
    });

    const x = useTransform(
        progress,
        (val) => pathRef.current?.getPointAtLength(val).x
    );
    const y = useTransform(
        progress,
        (val) => pathRef.current?.getPointAtLength(val).y
    );

    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="absolute h-full w-full"
                width="100%"
                height="100%"
                {...(otherProps as React.SVGProps<SVGSVGElement>)} // Correctly typed otherProps
            >
                <rect
                    fill="none"
                    width="100%"
                    height="100%"
                    rx={rx}
                    ry={ry}
                    ref={pathRef as React.RefObject<SVGRectElement>} // Correct ref type
                />
            </svg>
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "inline-block",
                    transform,
                }}
            >
                {children}
            </motion.div>
        </>
    );
};
