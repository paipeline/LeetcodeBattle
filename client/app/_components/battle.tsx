"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, User, Clock, Frown } from "lucide-react";
import { BattleRoomContext } from "../_context/battleRoomContext";

const Battle = () => {
  const router = useRouter();
  const { roomId, setRoomId, setRoomName, setRoomCreater, setRoomDifficulty, setRoomPlayers, setRoomMaxPlayers, setRoomProblems, setRoomStatus, setRoomCreatedAt } = useContext(BattleRoomContext);

  // 模拟房间数据
  const rooms = [
    {
      id: "room-1",
      name: "算法挑战赛",
      owner: "Pai Peng",
      difficulty: "中等",
      players: 1,
      maxPlayers: 2,
      problems: 3,
      status: "waiting",
      createdAt: "2分钟前"
    },
    {
      id: "room-2",
      name: "每日刷题",
      owner: "Bob Wang",
      difficulty: "简单",
      players: 2,
      maxPlayers: 2,
      problems: 5,
      status: "in-progress",
      createdAt: "15分钟前"
    },
    {
      id: "room-3",
      name: "高难度挑战",
      owner: "Alice Chen",
      difficulty: "困难",
      players: 1,
      maxPlayers: 2,
      problems: 2,
      status: "waiting",
      createdAt: "30分钟前"
    },
    {
      id: "room-4",
      name: "周末刷题小组",
      owner: "John Doe",
      difficulty: "中等",
      players: 2,
      maxPlayers: 2,
      problems: 4,
      status: "in-progress",
      createdAt: "1小时前"
    },
    {
      id: "room-5",
      name: "面试准备",
      owner: "Sarah Li",
      difficulty: "中等",
      players: 1,
      maxPlayers: 2,
      problems: 5,
      status: "waiting",
      createdAt: "3小时前"
    },
  ] as any[];

  // 加入房间
  const joinRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    console.log("Joining room:", room); // 添加调试日志
    
    // 确保在 useEffect 外设置Context值
    setRoomId(roomId);
    setRoomName(room.name);
    setRoomCreater(room.owner);
    setRoomDifficulty(room.difficulty);
    setRoomPlayers(room.players);
    setRoomMaxPlayers(room.maxPlayers);
    setRoomProblems(room.problems);
    setRoomStatus(room.status);
    setRoomCreatedAt(room.createdAt);
    
    router.push(`/battle/${roomId}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#333333]">Select / Create Room</h1>
        <button
          onClick={() => router.push('/battle/create')}
          className="bg-[#f8a201] hover:bg-[#e59400] px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Room
        </button>
      </div>
      {/* 房间列表 */}
      <div className="flex-1 overflow-y-auto">
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room: any) => (
              <div key={room.id} className="border border-[#dcdcdc] rounded-lg p-4 hover:border-[#f8a201] transition-colors bg-white">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-semibold text-[#333333]">{room.name}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs ${room.status === 'waiting'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {room.status === 'waiting' ? 'Waiting' : 'In Progress'}
                  </span>
                </div>

                <div className="flex items-center mb-2 text-sm text-[#808080]">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>Creator: {room.owner}</span>
                  </div>
                  <div className="mx-3">•</div>
                  <div>{room.createdAt}</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="bg-[#e1ecf4] text-[#0f4b6e] px-2 py-1 rounded text-xs">
                    Difficulty: {room.difficulty}
                  </div>
                  <div className="bg-[#e1ecf4] text-[#0f4b6e] px-2 py-1 rounded text-xs">
                    Problems: {room.problems}
                  </div>
                  <div className="bg-[#e1ecf4] text-[#0f4b6e] px-2 py-1 rounded text-xs">
                    Players: {room.players}/{room.maxPlayers}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => joinRoom(room.id)}
                    disabled={room.players >= room.maxPlayers && room.status === 'in-progress'}
                    className={`px-4 py-1.5 rounded text-sm font-medium ${room.players >= room.maxPlayers && room.status === 'in-progress'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-[#0f4b6e] text-white hover:bg-[#0a3b5a]'
                      }`}
                  >
                    {room.status === 'waiting' ? 'Join' : 'Waiting'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-[#dcdcdc]">
            <Frown className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-[#808080] text-lg">No rooms found</p>
            <div className="flex justify-center">
              <button className="bg-[#f8a201] hover:bg-[#e59400] px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Create Room
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Battle;