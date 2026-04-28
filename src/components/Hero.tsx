"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CountUp from "./CountUp";

const HEADLINE_LINES = ["축제랑과 함께", "더 즐거운 축제 경험"];

const SUB_COPY =
  "부스 운영부터 주문 관리까지 캠퍼스 축제의 모든 순간을 연결하는 B2B 서비스 입니다.";

const wordVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function BlurWords({
  text,
  delay = 0,
  step = 0.06,
  duration = 0.55,
}: {
  text: string;
  delay?: number;
  step?: number;
  duration?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={wordVariants}
          initial="hidden"
          animate="show"
          transition={{
            delay: delay + i * step,
            duration,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mr-[0.28em] inline-block"
        >
          {w}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  const scrollNext = () => {
    document
      .getElementById("hero-next")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const totalDelay =
    (HEADLINE_LINES[0].split(" ").length +
      HEADLINE_LINES[1].split(" ").length) *
    0.06;

  return (
    <section className="relative flex h-screen min-h-[640px] w-full flex-col overflow-hidden bg-white px-5 pt-60 pb-20 md:px-8 md:pt-72 md:pb-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <h1 className="text-[52px] font-semibold tracking-[-0.01em] leading-[1.7] text-[#292a2e]">
          {HEADLINE_LINES.map((line, i) => (
            <span key={i} className="block">
              <BlurWords
                text={line}
                delay={i === 0 ? 0 : HEADLINE_LINES[0].split(" ").length * 0.06}
              />
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: totalDelay + 0.1,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 max-w-2xl break-keep text-[16px] leading-[1.7] text-[#5f616a]"
        >
          {SUB_COPY}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: totalDelay + 0.35, duration: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#292a2e] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(41,42,46,0.16)] transition-colors hover:bg-[#36383e] md:text-base"
          >
            문의하기
          </Link>
          <button
            type="button"
            onClick={scrollNext}
            className="inline-flex items-center justify-center rounded-full border border-[#36383e33] bg-white px-7 py-3.5 text-sm font-semibold text-[#292a2e] transition-colors hover:border-[#292a2e] md:text-base"
          >
            더 알아보기
          </button>
        </motion.div>
      </div>

      <div className="flex-1" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: totalDelay + 0.6, duration: 0.5 }}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="flex items-start justify-center gap-10 md:gap-16">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex items-baseline text-3xl font-semibold tracking-[-0.01em] text-[#292a2e] md:text-5xl">
              <CountUp to={289} duration={2} className="font-semibold" />
              <span className="ml-1 text-[24px]">+</span>
            </span>
            <span className="text-xs font-medium tracking-[-0.01em] text-[#92949d] md:text-sm">
              누적 주문 건수
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex items-baseline text-3xl font-semibold tracking-[-0.01em] text-[#292a2e] md:text-5xl">
              <CountUp to={13} duration={2} className="font-semibold" />
              <span className="ml-1 text-[24px]">%</span>
            </span>
            <span className="text-xs font-medium tracking-[-0.01em] text-[#92949d] md:text-sm">
              주문 누락율 감소
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex items-baseline text-3xl font-semibold tracking-[-0.01em] text-[#292a2e] md:text-5xl">
              <CountUp to={42} duration={2} className="font-semibold" />
              <span className="ml-1 text-[24px]">초</span>
            </span>
            <span className="text-xs font-medium tracking-[-0.01em] text-[#92949d] md:text-sm">
              평균 주문 처리시간
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
