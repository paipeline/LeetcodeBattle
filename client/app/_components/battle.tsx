"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Battle = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [roomType, setRoomType] = useState("all");

  // 模拟房间数据
  const rooms = [
    {
      id: "room-1",
      name: "算法挑战赛",
      owner: "Pai Peng",
      difficulty: "中等",
      players: 2,
      maxPlayers: 4,
      problems: 3,
      status: "waiting",
      createdAt: "2分钟前"
    },
    {
      id: "room-2",
      name: "每日刷题",
      owner: "Bob Wang",
      difficulty: "简单",
      players: 3,
      maxPlayers: 3,
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
      players: 4,
      maxPlayers: 4,
      problems: 4,
      status: "in-progress",
      createdAt: "1小时前"
    },
    {
      id: "room-5",
      name: "面试准备",
      owner: "Sarah Li",
      difficulty: "中等",
      players: 2,
      maxPlayers: 6,
      problems: 5,
      status: "waiting",
      createdAt: "3小时前"
    },
  ] as any[];

  // 加入房间
  const joinRoom = (roomId: string) => {
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
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
                    {room.status === 'waiting' ? 'Join' : 'Watch'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-[#dcdcdc]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[#808080] text-lg">No rooms found</p>
            <div className="flex justify-center">
              <button className="bg-[#f8a201] hover:bg-[#e59400] px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
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