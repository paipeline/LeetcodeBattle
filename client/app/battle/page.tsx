"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Problem from "../_components/problem";
import Leaderboard from "../_components/leaderboard";
import BattleRoom from "../_components/battleRoom";
import { motion, AnimatePresence } from "framer-motion";

const Battle = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [prevIndex, setPrevIndex] = useState(1);

  useEffect(() => {
    setPrevIndex(pageIndex);
  }, [pageIndex]);

  const handleTabChange = (index: number) => {
    setPrevIndex(pageIndex);
    setPageIndex(index);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-[#f9f9f9]">
      <header className="flex flex-row items-center justify-between w-full h-14 px-4 bg-white text-[#333333] shadow-md border-b border-[#dcdcdc]">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-2xl">
            <span className="text-[#000000]">Leet</span>
            <span className="text-[#f8a201]">Battle</span>
          </div>
          <nav className="hidden md:flex ml-8 space-x-6">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-[#808080] hover:text-[#000000] transition-colors">Home</Link>
            </div>
            <div className="bg-white border-b border-[#dcdcdc] px-4 py-1">
              <div className="flex space-x-8">
                <button
                  onClick={() => handleTabChange(0)}
                  className={`py-3 px-1 relative font-medium transition-all ${pageIndex === 0 ? 'text-[#0f4b6e]' : 'text-[#808080] hover:text-[#333333]'}`}
                >
                  Battle Room
                  {pageIndex === 0 && <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f8a201]" layoutId="underline" />}
                </button>
                <button
                  onClick={() => handleTabChange(1)}
                  className={`py-3 px-1 relative font-medium transition-all ${pageIndex === 1 ? 'text-[#0f4b6e]' : 'text-[#808080] hover:text-[#333333]'}`}
                >
                  Problem
                  {pageIndex === 1 && <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f8a201]" layoutId="underline" />}
                </button>
                <button
                  onClick={() => handleTabChange(2)}
                  className={`py-3 px-1 relative font-medium transition-all ${pageIndex === 2 ? 'text-[#0f4b6e]' : 'text-[#808080] hover:text-[#333333]'}`}
                >
                  Leaderboard
                  {pageIndex === 2 && <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f8a201]" layoutId="underline" />}
                </button>
              </div>
            </div>
          </nav>
          <div />
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-[#f8a201] hover:bg-[#e59400] px-5 py-2 rounded-xl text-white text-sm font-semibold transition-colors">
            New Battle
          </button>
          <div className="relative">
            <button
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-[#e1ecf4] flex items-center justify-center text-[#0f4b6e] border border-[#dcdcdc]">
                <img src="/images/对不起.png" alt="avatar" width={32} height={32} className="rounded-full" />
              </div>
              <span className="hidden md:inline text-[#333333] font-semibold">Pai Peng</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <div className="p-4 h-full overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pageIndex}
                initial={{ opacity: 0, y: prevIndex < pageIndex ? 20 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prevIndex < pageIndex ? -20 : 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full bg-white rounded-lg shadow-sm p-4 border border-[#dcdcdc]"
              >
                {pageIndex === 0 && <BattleRoom />}
                {pageIndex === 1 && <Problem />}
                {pageIndex === 2 && <Leaderboard />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Battle;