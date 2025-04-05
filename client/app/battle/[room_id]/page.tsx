"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Clock, Play, Code, CheckCircle, Settings } from "lucide-react";
import { BattleRoomContext } from "@/app/_context/battleRoomContext";
import { useContext, useState, useEffect } from "react";
import Sidebar from "@/app/_components/sidebar";
import Editor from "@monaco-editor/react";

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

  const [code, setCode] = useState("// 在这里编写你的代码\n\n");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

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

  const [opponentCode, setOpponentCode] = useState("// 对手正在编写代码...\n// 当他们提交后你可以看到他们的代码");

  return (
    <div className="flex flex-col h-[100vh] w-full bg-gradient-to-br from-white to-[#f5f7fa] shadow-md">
      <Sidebar />
      {/* 顶部导航栏 */}
      <header className="flex justify-between items-center h-14 px-4 shadow-md border-b border-[#dcdcdc] bg-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer hover:bg-[#f0f5fa] rounded-full p-2 transition-colors">
            <button onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5 text-[#3a5676]" />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-[#2d4052]">{roomName || "Unknown Room"}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                participants.filter(p => p.status === "completed").length === 2 ? 'bg-red-100 text-red-800' :
                participants.some(p => p.status === "completed") ? 'bg-amber-100 text-amber-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {participants.filter(p => p.status === "completed").length === 2 ? 'Completed' :
                  participants.some(p => p.status === "completed") ? 'Partially Completed' : 'In Progress'}
              </span>
            </div>
            <div className="flex items-center text-xs text-[#6a7a8c]">
              <User className="w-3 h-3 mr-1" />
              <span>Creator: {roomCreater || "Unknown"}</span>
              <span className="mx-1">•</span>
              <Clock className="w-3 h-3 mr-1" />
              <span>{roomCreatedAt || "Just Now"}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-[#edf2f7] hover:bg-[#e2e8f0] px-3 py-1.5 rounded-lg flex items-center text-[#3a5676] font-medium transition-colors"
            onClick={() => {
              window.dispatchEvent(new Event("openSidebar"));
            }}
          >
            <Code className="w-4 h-4 mr-1" />
            <span>Problem</span>
          </button>
          <div className="bg-[#edf2f7] px-3 py-1.5 rounded-lg flex items-center text-[#3a5676] font-medium">
            <Clock className="w-4 h-4 mr-2 text-[#f8a201]" />
            <span>{timeLeft}</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              {/* 玩家1名字和头像 */}
              <div className="flex flex-col items-center mr-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#0f4b6e] shadow-md">
                  <img
                    src={participants[0].avatar}
                    alt={participants[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* VS标志 */}
              <div className="mx-2 bg-gradient-to-r from-[#f8a201] to-[#f86e01] text-white font-bold text-xs py-0.5 px-2 rounded shadow-md">
                <span>VS</span>
              </div>

              {/* 玩家2头像和名字 */}
              <div className="flex flex-col items-center ml-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#555555] shadow-md">
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

      <main className="flex flex-1 overflow-hidden">
        {/* 左侧代码编辑器 */}
        <div className="flex-[0.6] flex flex-col border-r border-[#e8edf2]">
          {/* 用户信息栏 */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-[#e8edf2] bg-white">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2 shadow-sm">
                <img
                  src={participants[0].avatar}
                  alt={participants[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-[#2d4052] font-medium">{participants[0].name}</span>
              {participants[0].status === "completed" && (
                <CheckCircle className="w-4 h-4 ml-2 text-emerald-600" />
              )}
            </div>
          </div>
          
          {/* Monaco编辑器 */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              theme={theme}
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on',
                wordWrap: 'on',
              }}
            />
          </div>
          
          {/* 输出面板 */}
          <div className="relative h-[180px] border-t border-[#e8edf2] bg-white flex flex-col">
            <div className="flex justify-between items-center px-4 py-2 border-b border-[#e8edf2] bg-white">
              <span className="text-sm text-[#2d4052] font-medium">Console Output</span>
            </div>
            <div className="flex-1 p-3 overflow-auto text-sm text-[#4a5568] font-mono bg-[#f8fafc]">
              {output || "// Results will be displayed here after running the code"}
            </div>

            {/* 运行 和 提交按钮 */}
            <div className="absolute bottom-0 right-0 flex justify-end px-4 gap-2 py-2">
              <button className="bg-[#3182ce] text-white px-4 py-2 rounded-lg font-medium transition-colors hover:bg-[#2c5282] shadow-sm">
                Run
              </button>
              <button className="bg-[#38a169] text-white px-4 py-2 rounded-lg font-medium transition-colors hover:bg-[#2f855a] shadow-sm">
                Submit
              </button>
            </div>
          </div>
        </div>
        
        {/* 右侧对手代码区域 */}
        <div className="flex-[0.4] flex flex-col bg-white">
          {/* 对手信息栏 */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-[#e8edf2] bg-white">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2 shadow-sm">
                <img
                  src={participants[1].avatar}
                  alt={participants[1].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-[#2d4052] font-medium">{participants[1].name}</span>
              {participants[1].status === "completed" && (
                <CheckCircle className="w-4 h-4 ml-2 text-emerald-600" />
              )}
            </div>
            <div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                participants[1].status === "completed" ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {participants[1].status === "completed" ? 'Completed' : 'Coding'}
              </span>
            </div>
          </div>
          
          {/* 对手只读编辑器 */}
          <div className="flex-1 overflow-hidden bg-[#f8fafc]">
            <Editor
              height="100%"
              theme={theme}
              language={language}
              value={opponentCode}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on',
                wordWrap: 'on',
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default BattleRoom;