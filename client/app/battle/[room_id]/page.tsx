"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Clock, Play } from "lucide-react";
import { BattleRoomContext } from "@/app/_context/battleRoomContext";
import { useContext, useState, useEffect } from "react";
import Sidebar from "@/app/_components/sidebar";

interface Participant {
  id: number;
  name: string;
  avatar: string;
  isMe: boolean;
  status: string;
  submittedAt: string | null;
  score: number | null;
}

const BattleRoom = () => {
  const params = useParams();
  const router = useRouter();
  const { roomId, roomName, roomCreater, roomDifficulty, roomPlayers, roomMaxPlayers, roomProblems, roomStatus, roomCreatedAt } = useContext(BattleRoomContext);

  // 模拟一些假数据
  const [timeLeft, setTimeLeft] = useState("30:00");
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      name: "Pai Peng",
      avatar: "/images/对不起.png",
      isMe: true,
      status: "coding",
      submittedAt: null,
      score: null,
    },
    {
      id: 2,
      name: "Bob Wang",
      avatar: "/images/avatar2.png",
      isMe: false,
      status: "coding",
      submittedAt: null,
      score: null,
    }
  ]);

  return (
    <div className="flex flex-col h-[100vh] w-full">
      {/* header */}
      <header className="flex justify-between items-center h-14 px-4 border-b border-[#dcdcdc] shadow-sm bg-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer hover:bg-[#f0f0f0] rounded-full p-2 transition-colors">
            <button onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5 text-[#555555]" />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-[#333333]">{roomName || "对战房间"}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${participants.filter(p => p.status === "completed").length === 2 ? 'bg-red-100 text-red-800' :
                  participants.some(p => p.status === "completed") ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                }`}>
                {participants.filter(p => p.status === "completed").length === 2 ? '已结束' :
                  participants.some(p => p.status === "completed") ? '部分完成' : '进行中'}
              </span>
            </div>
            <div className="flex items-center text-xs text-[#808080]">
              <User className="w-3 h-3 mr-1" />
              <span>创建者: {roomCreater || "未知"}</span>
              <span className="mx-1">•</span>
              <Clock className="w-3 h-3 mr-1" />
              <span>{roomCreatedAt || "刚刚"}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#f0f0f0] px-3 py-1.5 rounded-lg flex items-center text-[#333333] font-medium">
            <Clock className="w-4 h-4 mr-2 text-[#f8a201]" />
            <span>{timeLeft}</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              {/* 玩家1名字和头像 */}
              <div className="flex flex-row items-center mr-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#0f4b6e]">
                  <img
                    src={participants[0].avatar}
                    alt={participants[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* VS标志 */}
              <div className="mx-1 bg-gradient-to-r from-[#f8a201] to-[#f86e01] text-white font-bold text-xs py-0.5 px-1.5 rounded shadow-sm">
                <span>VS</span>
              </div>

              {/* 玩家2头像和名字 */}
              <div className="flex flex-row items-center ml-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#555555]">
                  <img
                    src={participants[1].avatar}
                    alt={participants[1].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* 主要内容区 - 现在使用flex布局将侧边栏和主内容区分开 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 侧边栏 */}
        <Sidebar />
        
        {/* 主要对战内容区 */}
        <main className="flex-1 p-4 overflow-auto">
          <div className="bg-white p-4 rounded-lg border border-[#dcdcdc] shadow-sm h-full">
            {/* 这里可以放置对战代码编辑器等内容 */}
            <h2 className="text-lg font-semibold mb-4">代码对战区</h2>
            <p className="text-gray-500">在这里编写你的代码...</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BattleRoom;