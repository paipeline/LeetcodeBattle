"use client";

import { useState, useEffect, useRef } from "react";
import { XCircle, Info, AlertCircle, X, Search, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BattleRoomContext } from "../_context/battleRoomContext";

// 题目类型定义（从Problem组件引入）
interface ProblemType {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: string;
  tags: string[];
  status: "Completed" | "Attempted" | "Not Started";
  lastSubmitted?: string;
}

// 从Problem组件获取的模拟题目数据
const mockProblems: ProblemType[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "49.2%",
    tags: ["Array", "Hash Table"],
    status: "Completed",
    lastSubmitted: "2023-12-15",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    acceptance: "41.8%",
    tags: ["Linked List", "Math"],
    status: "Completed",
    lastSubmitted: "2023-12-10",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "38.5%",
    tags: ["Hash Table", "String", "Sliding Window"],
    status: "Attempted",
    lastSubmitted: "2023-11-25",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "41.2%",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    status: "Not Started",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    acceptance: "36.4%",
    tags: ["String", "Dynamic Programming"],
    status: "Completed",
    lastSubmitted: "2023-12-05",
  },
  {
    id: 6,
    title: "Zigzag Conversion",
    difficulty: "Medium",
    acceptance: "51.2%",
    tags: ["String"],
    status: "Not Started",
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Easy",
    acceptance: "35.8%",
    tags: ["Math"],
    status: "Completed",
    lastSubmitted: "2023-11-20",
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    acceptance: "21.6%",
    tags: ["String", "Math"],
    status: "Attempted",
    lastSubmitted: "2023-10-15",
  },
  {
    id: 9,
    title: "Palindrome Number",
    difficulty: "Easy",
    acceptance: "58.7%",
    tags: ["Math"],
    status: "Completed",
    lastSubmitted: "2023-11-15",
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    acceptance: "31.5%",
    tags: ["String", "Dynamic Programming", "Backtracking"],
    status: "Not Started",
  },
];

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
  const [problemCount, setProblemCount] = useState(3);
  const [step, setStep] = useState(1); // 1: 基本信息, 2: 选择题目
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProblems, setSelectedProblems] = useState<ProblemType[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<ProblemType[]>(mockProblems);
  const [problemDifficultyFilter, setProblemDifficultyFilter] = useState<string[]>([]);
  
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
      setProblemCount(3);
      setError("");
      setIsCreating(false);
      setStep(1);
      setSelectedProblems([]);
      setSearchTerm("");
      setProblemDifficultyFilter([]);
    }
  }, [isOpen]);

  // 筛选题目
  useEffect(() => {
    let filtered = [...mockProblems];
    
    // 应用搜索筛选
    if (searchTerm) {
      filtered = filtered.filter(problem => 
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        problem.id.toString().includes(searchTerm)
      );
    }
    
    // 应用难度筛选
    if (problemDifficultyFilter.length > 0) {
      filtered = filtered.filter(problem => problemDifficultyFilter.includes(problem.difficulty));
    }
    
    setFilteredProblems(filtered);
  }, [searchTerm, problemDifficultyFilter]);

  // 处理题目难度筛选
  const handleDifficultyFilterChange = (difficulty: string) => {
    setProblemDifficultyFilter(prev => {
      if (prev.includes(difficulty)) {
        return prev.filter(d => d !== difficulty);
      } else {
        return [...prev, difficulty];
      }
    });
  };

  // 处理题目选择
  const toggleProblemSelection = (problem: ProblemType) => {
    const isSelected = selectedProblems.some(p => p.id === problem.id);
    
    if (isSelected) {
      setSelectedProblems(prev => prev.filter(p => p.id !== problem.id));
    } else {
      if (selectedProblems.length < problemCount) {
        setSelectedProblems(prev => [...prev, problem]);
      }
    }
  };

  // 随机选择题目
  const selectRandomProblems = () => {
    // 根据当前筛选结果随机选择
    const availableProblems = [...filteredProblems];
    const selected: ProblemType[] = [];
    
    // 打乱数组
    for (let i = availableProblems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableProblems[i], availableProblems[j]] = [availableProblems[j], availableProblems[i]];
    }
    
    // 选择前N个
    const count = Math.min(problemCount, availableProblems.length);
    for (let i = 0; i < count; i++) {
      selected.push(availableProblems[i]);
    }
    
    setSelectedProblems(selected);
  };

  // 下一步：从基本信息到选择题目
  const goToNextStep = () => {
    if (!name.trim()) {
      setError("Please enter a room name");
      return;
    }
    
    setError("");
    setStep(2);
  };

  // 上一步：返回基本信息
  const goToPreviousStep = () => {
    setStep(1);
  };

  // 创建房间
  const createRoom = () => {
    if (selectedProblems.length < problemCount) {
      setError(`Please select ${problemCount} problems`);
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
      setRoomProblems(selectedProblems.length);
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
          <h2 className="text-xl font-semibold">
            {step === 1 ? "Create Battle Room" : "Select Problems"}
          </h2>
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
          
          {step === 1 ? (
            // 步骤1：基本信息
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
                    value={problemCount}
                    onChange={(e) => setProblemCount(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-[#edf2f7] rounded-lg appearance-none cursor-pointer accent-[#3182ce]"
                  />
                  <span className="ml-3 bg-[#edf2f7] w-8 h-8 flex items-center justify-center rounded-full text-[#2d4052] font-medium">
                    {problemCount}
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
          ) : (
            // 步骤2：选择题目
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[#2d4052] font-medium">
                  Selected: {selectedProblems.length}/{problemCount}
                </div>
                <button
                  onClick={selectRandomProblems}
                  className="text-sm text-[#3182ce] hover:text-[#2c5282] transition-colors"
                >
                  Random Select
                </button>
              </div>
              
              {/* 搜索和筛选 */}
              <div className="flex gap-2 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-1.5 border border-[#e8edf2] rounded-md pl-9 focus:outline-none focus:ring-2 focus:ring-[#3182ce] focus:border-transparent"
                  />
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2" />
                </div>
                
                <div className="flex space-x-1">
                  {["Easy", "Medium", "Hard"].map(diff => (
                    <button
                      key={diff}
                      onClick={() => handleDifficultyFilterChange(diff)}
                      className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                        problemDifficultyFilter.includes(diff)
                          ? diff === "Easy" 
                            ? "bg-green-100 text-green-800 border-green-200" 
                            : diff === "Medium"
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          : "bg-white text-[#4a5568] border-[#e8edf2]"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 题目列表 */}
              <div className="border border-[#e8edf2] rounded-md overflow-hidden max-h-[300px]">
                {/* 表头 */}
                <div className="grid grid-cols-12 bg-[#f8fafc] p-2 text-sm font-medium text-[#4a5568]">
                  <div className="col-span-1"></div>
                  <div className="col-span-7">Title</div>
                  <div className="col-span-2 text-center">Difficulty</div>
                  <div className="col-span-2 text-center">Acceptance</div>
                </div>
                
                {/* 列表内容 */}
                <div className="overflow-y-auto max-h-[260px]">
                  {filteredProblems.length > 0 ? (
                    filteredProblems.map(problem => {
                      const isSelected = selectedProblems.some(p => p.id === problem.id);
                      const isDisabled = !isSelected && selectedProblems.length >= problemCount;
                      
                      return (
                        <div 
                          key={problem.id} 
                          onClick={() => !isDisabled && toggleProblemSelection(problem)}
                          className={`grid grid-cols-12 p-2 border-t border-[#e8edf2] cursor-pointer ${
                            isSelected 
                              ? "bg-blue-50" 
                              : isDisabled 
                                ? "bg-gray-50 cursor-not-allowed" 
                                : "hover:bg-[#f8fafc]"
                          }`}
                        >
                          <div className="col-span-1 flex items-center justify-center">
                            {isSelected && <Check className="w-4 h-4 text-[#3182ce]" />}
                          </div>
                          <div className="col-span-7">
                            <div className="font-medium text-[#2d4052]">{problem.title}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {problem.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="px-1.5 py-0.5 bg-[#e1ecf4] text-[#0f4b6e] rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                              {problem.tags.length > 2 && (
                                <span className="px-1.5 py-0.5 bg-[#e1ecf4] text-[#0f4b6e] rounded text-xs">
                                  +{problem.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center justify-center">
                            <span className={`
                              ${problem.difficulty === "Easy" ? "text-green-600" : 
                                problem.difficulty === "Medium" ? "text-blue-600" : "text-red-600"}
                            `}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <div className="col-span-2 flex items-center justify-center">{problem.acceptance}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-[#4a5568]">
                      No problems found. Try different filters.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 底部按钮 */}
        <div className="px-5 py-4 bg-[#f8fafc] border-t border-[#e8edf2] flex justify-between">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#e8edf2] rounded-md text-[#4a5568] hover:bg-[#edf2f7] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={goToNextStep}
                className="px-4 py-2 rounded-md text-white font-medium bg-[#3182ce] hover:bg-[#2c5282] transition-colors"
              >
                Next: Select Problems
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={goToPreviousStep}
                className="px-4 py-2 border border-[#e8edf2] rounded-md text-[#4a5568] hover:bg-[#edf2f7] transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={createRoom}
                disabled={isCreating || selectedProblems.length < problemCount}
                className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
                  isCreating || selectedProblems.length < problemCount
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-[#3182ce] hover:bg-[#2c5282]"
                }`}
              >
                {isCreating ? "Creating..." : "Create Room"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popover;