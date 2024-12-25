"use client";
import { useEffect, useState } from "react"; // Import useState
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
    const [isClient, setIsClient] = useState(false); // State to track client-side rendering

    const wordsArray = words.split(" ");

    // This effect will run once the component is mounted on the client
    useEffect(() => {
        setIsClient(true); // Set state to true once mounted
    }, []);

    // Ensure animate only runs on the client side (after component is mounted)
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

    // Render nothing until we are on the client side
    if (!isClient) {
        return null; // Optionally, render a loading spinner or nothing until the component mounts
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
