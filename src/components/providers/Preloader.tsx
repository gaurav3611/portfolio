"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Design", "Engineer", "Ship"];

export function Preloader() {
  const [done, setDone] = useState(false);
  const [word, setWord] = useState(0);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const cycle = setInterval(
      () => setWord((w) => Math.min(w + 1, words.length - 1)),
      450
    );
    const exit = setTimeout(() => {
      setDone(true);
      document.documentElement.style.overflow = "";
    }, 1650);
    return () => {
      clearInterval(cycle);
      clearTimeout(exit);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex items-center gap-4">
            <motion.span
              className="size-2.5 rounded-full bg-primary"
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={word}
                className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {words[word]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
