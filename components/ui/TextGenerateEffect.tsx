"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
    words,
    className,
}: {
    words: string;
    className?: string;
}) => {
    const [scope, animate] = useAnimate();
    const [isClient, setIsClient] = useState(false); // To check if we're on the client side

    const wordsArray = words.split(" ");

    useEffect(() => {
        setIsClient(true); // This will run only on the client side
    }, []);

    useEffect(() => {
        if (isClient) {
            animate(
                "span",
                {
                    opacity: 1,
                },
                {
                    duration: 2,
                    delay: stagger(0.2),
                }
            );
        }
    }, [isClient, scope.current, animate]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => (
                    <motion.span
                        key={word + idx}
                        className={`${idx > 3 ? 'text-purple' : "dark:text-white text-black"} opacity-0`}
                    >
                        {word}{" "}
                    </motion.span>
                ))}
            </motion.div>
        );
    };

    if (!isClient) {
        return null; // Optionally render nothing or a loading spinner while waiting for client side render
    }

    return (
        <div className={cn("font-bold", className)}>
            <div className="my-4">
                <div className=" dark:text-white text-black leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
