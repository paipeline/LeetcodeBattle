"use client";
import { useState } from "react";
import Image from "next/image";

// Define leaderboard user type
interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  rank: number;
  score: number;
  problemsSolved: number;
  country: string;
  badge?: string;
}

const Leaderboard = () => {
  // Mock data for leaderboard
  const [users, setUsers] = useState<LeaderboardUser[]>([
    {
      id: 1,
      name: "Jane Smith",
      avatar: "/images/avatar1.png",
      rank: 1,
      score: 9850,
      problemsSolved: 458,
      country: "USA",
      badge: "Grandmaster"
    },
    {
      id: 2,
      name: "Alex Johnson",
      avatar: "/images/avatar2.png",
      rank: 2,
      score: 9720,
      problemsSolved: 441,
      country: "UK",
      badge: "Master"
    },
    {
      id: 3,
      name: "Wei Zhang",
      avatar: "/images/avatar3.png",
      rank: 3,
      score: 9680,
      problemsSolved: 432,
      country: "China",
      badge: "Master"
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      avatar: "/images/avatar4.png",
      rank: 4,
      score: 9510,
      problemsSolved: 425,
      country: "Spain"
    },
    {
      id: 5,
      name: "Raj Patel",
      avatar: "/images/avatar5.png",
      rank: 5,
      score: 9350,
      problemsSolved: 413,
      country: "India"
    },
    {
      id: 6,
      name: "Sophie Dubois",
      avatar: "/images/avatar6.png",
      rank: 6,
      score: 9290,
      problemsSolved: 402,
      country: "France"
    },
    {
      id: 7,
      name: "Hiroshi Tanaka",
      avatar: "/images/avatar7.png",
      rank: 7,
      score: 9150,
      problemsSolved: 398,
      country: "Japan"
    },
    {
      id: 8,
      name: "Olga Petrova",
      avatar: "/images/avatar8.png",
      rank: 8,
      score: 9080,
      problemsSolved: 389,
      country: "Russia"
    },
    {
      id: 9,
      name: "Lucas Silva",
      avatar: "/images/avatar9.png",
      rank: 9,
      score: 8950,
      problemsSolved: 378,
      country: "Brazil"
    },
    {
      id: 10,
      name: "Grace Kim",
      avatar: "/images/avatar10.png",
      rank: 10,
      score: 8870,
      problemsSolved: 370,
      country: "South Korea"
    }
  ]);

  // Get top 3 users for the podium
  const topThreeUsers = users.slice(0, 3);

  // Function to render user badge
  const renderBadge = (badge?: string) => {
    if (!badge) return null;

    const badgeColor =
      badge === "Grandmaster" ? "bg-gradient-to-r from-yellow-400 to-yellow-600" :
        badge === "Master" ? "bg-gradient-to-r from-purple-400 to-purple-600" :
          badge === "Expert" ? "bg-gradient-to-r from-blue-400 to-blue-600" :
            "bg-gradient-to-r from-green-400 to-green-600";

    return (
      <span className={`px-2 py-0.5 text-xs text-white rounded-full ${badgeColor}`}>
        {badge}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#333333]">Leaderboard</h1>
        <div className="flex space-x-4">
          <div
            className="px-3 py-1.5 border border-[#dcdcdc] rounded-lg bg-white text-sm"
          >
            <option value="weekly">Weekly</option>
          </div>
          <div
            className="px-3 py-1.5 border border-[#dcdcdc] rounded-lg bg-white text-sm"
          >
            <option value="global">Global</option>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Winners Podium - Left side */}
        <div className="flex flex-col justify-center lg:w-1/3 bg-gradient-to-br from-[#f9f9f9] to-[#f0f0f0] rounded-xl p-6 border border-[#dcdcdc] shadow-sm">
          <h2 className="text-xl font-bold text-center mb-6 text-[#333333]">Champions</h2>

          {/* First Place */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#FFD700] shadow-lg">
                <Image
                  src={topThreeUsers[0].avatar}
                  alt={topThreeUsers[0].name}
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-white font-bold text-lg shadow-md">
                1
              </div>
            </div>
            <div className="text-center mt-6">
              <div className="flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#FFD700] mr-1">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <p className="font-bold text-lg">{topThreeUsers[0]?.name}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#FFD700] ml-1">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-md text-[#808080]">{topThreeUsers[0]?.score} pts</p>
              <div className="mt-1">{renderBadge(topThreeUsers[0]?.badge)}</div>
              <p className="text-xs text-[#808080] mt-1">{topThreeUsers[0]?.country}</p>
              <div className="mt-4 w-32 h-12 bg-[#FFD700] rounded-t-lg mx-auto"></div>
            </div>
          </div>

          <div className="flex justify-around">
            {/* Second Place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#C0C0C0]">
                  <Image
                    src={topThreeUsers[1].avatar}
                    alt={topThreeUsers[1].name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#C0C0C0] flex items-center justify-center text-white font-bold text-sm shadow-md">
                  2
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="font-semibold">{topThreeUsers[1]?.name}</p>
                <p className="text-sm text-[#808080]">{topThreeUsers[1]?.score} pts</p>
                <div className="mt-1">{renderBadge(topThreeUsers[1]?.badge)}</div>
                <p className="text-xs text-[#808080] mt-1">{topThreeUsers[1]?.country}</p>
                <div className="mt-3 w-24 h-8 bg-[#C0C0C0] rounded-t-lg mx-auto"></div>
              </div>
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#CD7F32]">
                  <Image
                    src={topThreeUsers[2].avatar}
                    alt={topThreeUsers[2].name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#CD7F32] flex items-center justify-center text-white font-bold text-sm shadow-md">
                  3
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="font-semibold">{topThreeUsers[2]?.name}</p>
                <p className="text-sm text-[#808080]">{topThreeUsers[2]?.score} pts</p>
                <div className="mt-1">{renderBadge(topThreeUsers[2]?.badge)}</div>
                <p className="text-xs text-[#808080] mt-1">{topThreeUsers[2]?.country}</p>
                <div className="mt-7 w-24 h-4 bg-[#CD7F32] rounded-t-lg mx-auto"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Rankings Table - Right side */}
        <div className="flex-1 bg-white rounded-xl border border-[#dcdcdc] overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#0f4b6e] to-[#2c7da0] text-white py-3 px-4 font-semibold">
            <h2 className="text-lg">Top Players</h2>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-10 border-b border-[#dcdcdc] bg-[#f9f9f9] py-3 px-4 font-medium text-sm text-[#555555]">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2 text-center">Score</div>
            <div className="col-span-2 text-center">Problems</div>
          </div>

          {/* Table Body */}
          <div className="overflow-y-auto h-full">
            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-10 border-b border-[#dcdcdc] py-3 px-4 hover:bg-[#f9f9f9] transition-colors">
                <div className="col-span-1 flex items-center">
                  <div className="w-7 h-7 rounded-full bg-[#f0f0f0] flex items-center justify-center text-sm font-semibold text-[#555555] border border-[#dcdcdc]">
                    {user.rank}
                  </div>
                </div>
                <div className="col-span-5 flex items-center">
                  <div className="w-9 h-9 rounded-full overflow-hidden mr-3 bg-[#e1ecf4] border border-[#dcdcdc]">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium flex items-center text-[#333333]">
                      {user.name}
                      {user.badge && (
                        <span className="ml-2">{renderBadge(user.badge)}</span>
                      )}
                    </div>
                    <div className="text-xs text-[#808080]">{user.country}</div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center font-semibold text-[#0f4b6e]">
                  {user.score}
                </div>
                <div className="col-span-2 flex items-center justify-center text-[#555555]">
                  {user.problemsSolved}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;