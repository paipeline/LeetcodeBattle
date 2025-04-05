"use client";

import { useState, useEffect, useRef } from "react";
import { XCircle, Info, AlertCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BattleRoomContext } from "../_context/battleRoomContext";

const Popover = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean,
  onClose: () => void 
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setRoomId, setRoomName, setRoomCreater, setRoomDifficulty, setRoomPlayers, setRoomMaxPlayers, setRoomProblems, setRoomStatus, setRoomCreatedAt } = useContext(BattleRoomContext);
  
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [problems, setProblems] = useState(3);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  
  // 处理点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };
    
    // 添加ESC键关闭功能
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // 重置表单
  useEffect(() => {
    if (isOpen) {
      setName("");
      setDifficulty("medium");
      setProblems(3);
      setError("");
      setIsCreating(false);
    }
  }, [isOpen]);

  // 创建房间
  const createRoom = () => {
    if (!name.trim()) {
      setError("Please enter a room name");
      return;
    }
    
    setIsCreating(true);
    
    // 模拟API请求
    setTimeout(() => {
      const newRoomId = `room-${Date.now()}`;
      
      // 设置房间信息到Context
      setRoomId(newRoomId);
      setRoomName(name);
      setRoomCreater("You"); // 当前用户
      setRoomDifficulty(difficulty === "easy" ? "简单" : difficulty === "medium" ? "中等" : "困难");
      setRoomPlayers(1);
      setRoomMaxPlayers(2);
      setRoomProblems(problems);
      setRoomStatus("waiting");
      setRoomCreatedAt("刚刚");
      
      setIsCreating(false);
      onClose();
      
      // 重定向到房间
      router.push(`/battle/${newRoomId}`);
    }, 1000);
  };

  if (!isOpen) return null;

  return ( 
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      <div className="absolute inset-0 bg-[rgba(245,245,245,0.5)] backdrop-blur-[2px]" onClick={onClose}></div>
      <div 
        ref={popoverRef}
        className="relative mt-20 w-[600px] max-w-[90%] rounded-xl bg-white shadow-xl overflow-hidden animate-slide-down"
      >
        {/* 头部 */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-[#e8edf2] bg-gradient-to-r from-[#0f4b6e] to-[#3182ce] text-white">
          <h2 className="text-xl font-semibold">Create Battle Room</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* 表单内容 */}
        <div className="p-5">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            {/* 房间名称 */}
            <div>
              <label htmlFor="roomName" className="block text-sm font-medium text-[#2d4052] mb-1">
                Room Name*
              </label>
              <input
                id="roomName"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Enter room name"
                className="w-full p-2.5 border border-[#e8edf2] rounded-md focus:ring-2 focus:ring-[#3182ce] focus:border-[#3182ce] outline-none transition-all"
              />
            </div>
            
            {/* 难度选择 */}
            <div>
              <label className="block text-sm font-medium text-[#2d4052] mb-1">
                Difficulty Level
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setDifficulty("easy")}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    difficulty === "easy"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-[#f8fafc] text-[#4a5568] border border-[#e8edf2] hover:bg-[#edf2f7]"
                  }`}
                >
                  Easy
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty("medium")}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    difficulty === "medium"
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-[#f8fafc] text-[#4a5568] border border-[#e8edf2] hover:bg-[#edf2f7]"
                  }`}
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty("hard")}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                    difficulty === "hard"
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : "bg-[#f8fafc] text-[#4a5568] border border-[#e8edf2] hover:bg-[#edf2f7]"
                  }`}
                >
                  Hard
                </button>
              </div>
            </div>
            
            {/* 题目数量 */}
            <div>
              <label className="block text-sm font-medium text-[#2d4052] mb-1">
                Number of Problems
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={problems}
                  onChange={(e) => setProblems(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-[#edf2f7] rounded-lg appearance-none cursor-pointer accent-[#3182ce]"
                />
                <span className="ml-3 bg-[#edf2f7] w-8 h-8 flex items-center justify-center rounded-full text-[#2d4052] font-medium">
                  {problems}
                </span>
              </div>
            </div>
            
            {/* 说明 */}
            <div className="flex items-start p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 text-sm">
              <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>
                Battle rooms are limited to 2 players. Once created, your competitor will be able to see the room.
              </p>
            </div>
          </div>
        </div>
        
        {/* 底部按钮 */}
        <div className="px-5 py-4 bg-[#f8fafc] border-t border-[#e8edf2] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#e8edf2] rounded-md text-[#4a5568] hover:bg-[#edf2f7] transition-colors mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={createRoom}
            disabled={isCreating}
            className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
              isCreating
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-[#3182ce] hover:bg-[#2c5282]"
            }`}
          >
            {isCreating ? "Creating..." : "Create Room"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popover;