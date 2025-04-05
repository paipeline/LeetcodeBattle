"use client";

import { useContext } from "react";
import { BattleRoomContext } from "../_context/battleRoomContext";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, User, Clock, Award, Code, BookOpen, Users, BarChart } from "lucide-react";

// 模拟题目
const Sidebar = () => {
  const { roomId, roomName, roomCreater, roomDifficulty, roomPlayers, roomMaxPlayers, roomProblems, roomStatus, roomCreatedAt } = useContext(BattleRoomContext);
  const [isOpen, setIsOpen] = useState(true);
  const [isFullyOpen, setIsFullyOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setIsFullyOpen(true);
      }, 200);
    } else {
      setIsFullyOpen(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  }

  useEffect(() => {
    window.addEventListener("openSidebar", () => {
      setIsOpen(true);
      setTimeout(() => {
        setIsFullyOpen(true);
      }, 200);
    });
    return () => {
      window.removeEventListener("openSidebar", () => {});
    }
  }, []);

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarWidth;
  
    if (sidebarRef.current) {
      sidebarRef.current.style.transition = 'none';
    }
  
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(350, startWidth - (e.clientX - startX));
      setSidebarWidth(newWidth);
    };
  
    const handleMouseUp = () => {
      if (sidebarRef.current) {
        sidebarRef.current.style.transition = '';
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  return ( 
    <div 
      ref={sidebarRef}
      className="absolute right-0 h-full bg-[rgba(255,255,255,0.4)] backdrop-blur-sm backdrop-filter shadow-sm transition-all duration-200 flex flex-col"
      style={{ width: isOpen ? `${sidebarWidth}px` : '0' }}
    >
      {/* 侧边栏头部 */}
      <div className="h-14 flex items-center justify-between px-4">
        <h2 className={`font-semibold text-[#333333] ${isFullyOpen ? 'opacity-100' : 'opacity-0'} transition-all duration-200`}>房间信息</h2>
        <button
          onClick={toggleSidebar}
          className={`p-1.5 hover:bg-[#f0f0f0] rounded transition-all duration-200 ${isFullyOpen ? 'opacity-100' : 'opacity-0'}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
      {/* 侧边栏内容 */}
      <div className={`flex-1 overflow-y-auto p-4 ${isFullyOpen ? 'opacity-100' : 'opacity-0'} transition-all duration-200`}>
        <div className="bg-[#f9f9f9] rounded-lg p-3">
          <h3 className="text-sm font-semibold text-[#555555] mb-2 flex items-center">
            <Code className="w-4 h-4 mr-1 text-[#0f4b6e]" />
            题目信息
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#808080]">难度等级:</span>
              <span className="font-medium text-[#333333]">{roomDifficulty || "未知"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#808080]">题目数量:</span>
              <span className="font-medium text-[#333333]">{roomProblems || "未知"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#808080]">房间状态:</span>
              <span className={`font-medium ${roomStatus === 'waiting' ? 'text-green-600' :
                roomStatus === 'in-progress' ? 'text-yellow-600' : 'text-[#333333]'
                }`}>
                {roomStatus === 'waiting' ? '等待中' :
                  roomStatus === 'in-progress' ? '进行中' : '未知'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* handle */}
      <div 
        className="absolute left-0 top-0 h-full w-2 cursor-col-resize hover:bg-[#f8a20133] active:bg-[#f8a20166] transition-colors"
        onMouseDown={handleResize}
        onDoubleClick={() => setSidebarWidth(350)}
        style={{ touchAction: 'none' }}
      />
    </div>
   );
};

export default Sidebar;