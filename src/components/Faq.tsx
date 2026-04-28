"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Icon from "./Icon";

const FAQS = Array.from({ length: 6 }, (_, i) => ({ id: i }));

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative w-full overflow-hidden bg-white pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.01em] leading-[1.7] text-[#292a2e] min-h-[1em]">
              &nbsp;
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.7] text-[#5f616a] md:text-lg min-h-[1.6em]">
              {" "}
            </p>
          </div>

          <div className="flex flex-col">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              const isLast = idx === FAQS.length - 1;
              return (
                <div
                  key={faq.id}
                  className={`${isLast ? "" : "border-b border-[#36383e1a]"}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors md:py-6"
                  >
                    <span className="break-keep text-base font-semibold leading-[1.7] text-[#292a2e] md:text-lg min-h-[1em]">
                      &nbsp;
                    </span>
                    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center text-[#292a2e]">
                      <motion.span
                        animate={{
                          rotate: isOpen ? 90 : 0,
                          scale: isOpen ? 0 : 1,
                          opacity: isOpen ? 0 : 1,
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Icon name="add" size={20} weight={500} />
                      </motion.span>
                      <motion.span
                        initial={false}
                        animate={{
                          rotate: isOpen ? 0 : -90,
                          scale: isOpen ? 1 : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Icon name="remove" size={20} weight={500} />
                      </motion.span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-10">
                          <p className="break-keep text-sm leading-[1.7] text-[#5f616a] md:text-base min-h-[1.6em]">
                            {" "}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
