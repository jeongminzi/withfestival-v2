"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BOOTHS, type Booth } from "@/src/data/ranking";

function formatKRW(n: number) {
  return n.toLocaleString("ko-KR");
}

export default function Ranking() {
  const [booths, setBooths] = useState<Booth[]>(BOOTHS);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      setBooths((prev) => {
        const bumped = prev.map((b) => ({
          ...b,
          revenue: b.revenue + Math.floor(Math.random() * 18000) + 2000,
        }));
        return bumped.sort((a, b) => b.revenue - a.revenue);
      });
      setUpdatedAt(
        new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 4000);
    return () => clearInterval(id);
  }, []);

  const top3 = booths.slice(0, 3);
  const others = booths.slice(3);
  const podium = [
    { booth: top3[1], rank: 2 },
    { booth: top3[0], rank: 1 },
    { booth: top3[2], rank: 3 },
  ].filter((p) => Boolean(p.booth));

  return (
    <section className="relative w-full overflow-hidden bg-white pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <div className="mb-14 text-center">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.01em] text-[#292a2e]">
            실시간 대학 부스 랭킹
          </h1>
          <p className="mt-4 text-base text-[#7b7d85] md:text-lg">
            지금 가장 핫한 대학 부스는?
          </p>
          {updatedAt && (
            <p className="mt-3 text-xs text-[#92949d]">
              마지막 업데이트 {updatedAt}
            </p>
          )}
        </div>

        <div className="mb-14 flex items-end justify-center gap-3 md:gap-6">
          {podium.map(({ booth, rank }, i) => {
            const isFirst = rank === 1;
            const heightClass = isFirst
              ? "h-52 md:h-64"
              : rank === 2
                ? "h-40 md:h-52"
                : "h-32 md:h-44";
            const cardBg = isFirst
              ? "bg-[#ffb60b] border-transparent"
              : "bg-white border-[#36383e1a]";
            const subColor = isFirst ? "text-[#292a2e]/70" : "text-[#7b7d85]";
            return (
              <motion.div
                layout
                key={booth.id}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ animationDelay: `${i * 0.1}s` }}
                className="flex flex-1 flex-col items-center"
              >
                <div className="mb-3 flex flex-col items-center">
                  <div
                    className="mb-2 flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm md:h-14 md:w-14 md:text-sm"
                    style={{ backgroundColor: booth.color }}
                  >
                    {booth.abbr}
                  </div>
                  <span className="text-xs font-semibold text-[#5f616a] md:text-sm">
                    {formatKRW(booth.revenue)}원
                  </span>
                </div>

                <div
                  className={`flex w-full flex-col items-center justify-start rounded-t-2xl border p-3 shadow-[0_8px_24px_rgba(54,56,62,0.06)] ${heightClass} ${cardBg}`}
                >
                  <span className="text-2xl font-black text-[#292a2e] opacity-25 md:text-3xl">
                    {rank}
                  </span>
                  <div className="mt-2 flex flex-col items-center text-center">
                    <span className="text-sm font-bold leading-tight text-[#292a2e] md:text-base">
                      {booth.name}
                    </span>
                    <span
                      className={`mt-1 break-keep text-[10px] font-medium md:text-xs ${subColor}`}
                    >
                      {booth.university} · {booth.affiliation}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mx-auto max-w-2xl">
          <motion.div layout className="flex flex-col gap-3">
            {others.map((b, idx) => (
              <motion.div
                layout
                key={b.id}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="flex items-center justify-between rounded-2xl border border-[#36383e1a] bg-white px-5 py-4 transition-shadow hover:shadow-[0_8px_24px_rgba(54,56,62,0.06)]"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f8fa] font-black text-[#92949d]">
                    {idx + 4}
                  </div>
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: b.color }}
                  >
                    {b.abbr}
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-bold text-[#292a2e] md:text-base">
                      {b.name}
                    </span>
                    <span className="mt-0.5 truncate text-xs text-[#7b7d85] md:text-sm">
                      {b.university} · {b.affiliation}
                    </span>
                  </div>
                </div>
                <span className="ml-3 shrink-0 font-mono text-sm font-bold text-[#292a2e] md:text-base">
                  {formatKRW(b.revenue)}원
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
