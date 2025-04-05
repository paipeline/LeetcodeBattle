"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SlidersHorizontal, Search, Frown } from "lucide-react";

// 题目类型定义
interface ProblemType {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: string;
  tags: string[];
  status: "Completed" | "Attempted" | "Not Started";
  lastSubmitted?: string;
}

// 题目分类
const problemCategories = [
  { id: "array", name: "Array" },
  { id: "string", name: "String" },
  { id: "hash-table", name: "Hash Table" },
  { id: "dynamic-programming", name: "Dynamic Programming" },
  { id: "math", name: "Math" },
  { id: "sorting", name: "Sorting" },
  { id: "greedy", name: "Greedy" },
  { id: "depth-first-search", name: "Depth-First Search" },
  { id: "binary-search", name: "Binary Search" },
  { id: "tree", name: "Tree" },
  { id: "matrix", name: "Matrix" },
  { id: "bit-manipulation", name: "Bit Manipulation" },
  { id: "breadth-first-search", name: "Breadth-First Search" },
  { id: "graph", name: "Graph" },
  { id: "heap", name: "Heap" },
  { id: "linked-list", name: "Linked List" },
  { id: "stack", name: "Stack" },
  { id: "queue", name: "Queue" },
  { id: "recursion", name: "Recursion" },
  { id: "two-pointers", name: "Two Pointers" },
  { id: "sliding-window", name: "Sliding Window" },
  { id: "divide-and-conquer", name: "Divide and Conquer" },
];

// 模拟题目数据
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
  {
    id: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    acceptance: "61.2%",
    tags: ["Array", "Two Pointers", "Greedy"],
    status: "Attempted",
    lastSubmitted: "2023-12-01",
  },
  {
    id: 12,
    title: "Integer to Roman",
    difficulty: "Medium",
    acceptance: "64.8%",
    tags: ["Math", "String"],
    status: "Not Started",
  },
  {
    id: 13,
    title: "Roman to Integer",
    difficulty: "Easy",
    acceptance: "62.3%",
    tags: ["String", "Math"],
    status: "Completed",
    lastSubmitted: "2023-10-20",
  },
  {
    id: 14,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    acceptance: "42.5%",
    tags: ["String"],
    status: "Completed",
    lastSubmitted: "2023-09-10",
  },
  {
    id: 15,
    title: "3Sum",
    difficulty: "Medium",
    acceptance: "35.6%",
    tags: ["Array", "Two Pointers", "Sorting"],
    status: "Attempted",
    lastSubmitted: "2023-11-05",
  },
];

const Problem = () => {
  // 状态管理
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [problems, setProblems] = useState<ProblemType[]>(mockProblems);
  const [filteredProblems, setFilteredProblems] = useState<ProblemType[]>(mockProblems);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const problemsPerPage = 10;
  
  // 处理难度筛选
  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(prev => {
      if (prev.includes(difficulty)) {
        return prev.filter(d => d !== difficulty);
      } else {
        return [...prev, difficulty];
      }
    });
    setCurrentPage(1);
  };

  // 处理分类筛选
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setCurrentPage(1);
  };

  // 处理状态筛选
  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // 应用所有筛选条件
  useEffect(() => {
    let filtered = [...problems];
    
    // 应用搜索筛选
    if (searchTerm) {
      filtered = filtered.filter(problem => 
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        problem.id.toString().includes(searchTerm)
      );
    }
    
    // 应用难度筛选
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter(problem => selectedDifficulty.includes(problem.difficulty));
    }
    
    // 应用分类筛选
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(problem => 
        problem.tags.some(tag => {
          const categoryIds = selectedCategories.map(category => {
            const found = problemCategories.find(c => c.name === category);
            return found ? found.id : null;
          });
          return categoryIds.includes(tag.toLowerCase().replace(/\s+/g, '-'));
        })
      );
    }
    
    // 应用状态筛选
    if (statusFilter !== "all") {
      filtered = filtered.filter(problem => problem.status === statusFilter);
    }
    
    setFilteredProblems(filtered);
  }, [problems, searchTerm, selectedDifficulty, selectedCategories, statusFilter]);

  // 分页相关
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return ( 
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#333333]">Problems</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-3 py-1.5 border border-[#dcdcdc] rounded-lg flex items-center text-sm hover:bg-[#f0f0f0]"
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Filter
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 border border-[#dcdcdc] rounded-lg pl-9 w-60 focus:outline-none focus:ring-2 focus:ring-[#f8a201] focus:border-transparent"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2" />
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* 侧边栏筛选器 - 桌面版和移动版 */}
        <div 
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block w-full md:w-64 bg-white border border-[#dcdcdc] rounded-lg p-4 overflow-y-auto`}
        >
          {/* 难度筛选 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Difficulty</h3>
            <div className="space-y-2">
              {["Easy", "Medium", "Hard"].map(difficulty => (
                <div key={difficulty} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`difficulty-${difficulty}`}
                    checked={selectedDifficulty.includes(difficulty)}
                    onChange={() => handleDifficultyChange(difficulty)}
                    className="h-4 w-4 text-[#f8a201] focus:ring-[#f8a201] rounded"
                  />
                  <label 
                    htmlFor={`difficulty-${difficulty}`} 
                    className={`ml-2 ${
                      difficulty === "Easy" ? "text-green-600" : 
                      difficulty === "Medium" ? "text-yellow-600" : "text-red-600"
                    }`}
                  >
                    {difficulty}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* 状态筛选 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="status-all"
                  name="status"
                  checked={statusFilter === "all"}
                  onChange={() => handleStatusChange("all")}
                  className="h-4 w-4 text-[#f8a201] focus:ring-[#f8a201]"
                />
                <label htmlFor="status-all" className="ml-2">All</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="status-completed"
                  name="status"
                  checked={statusFilter === "Completed"}
                  onChange={() => handleStatusChange("Completed")}
                  className="h-4 w-4 text-[#f8a201] focus:ring-[#f8a201]"
                />
                <label htmlFor="status-completed" className="ml-2">Completed</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="status-attempted"
                  name="status"
                  checked={statusFilter === "Attempted"}
                  onChange={() => handleStatusChange("Attempted")}
                  className="h-4 w-4 text-[#f8a201] focus:ring-[#f8a201]"
                />
                <label htmlFor="status-attempted" className="ml-2">Attempted</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="status-not-started"
                  name="status"
                  checked={statusFilter === "Not Started"}
                  onChange={() => handleStatusChange("Not Started")}
                  className="h-4 w-4 text-[#f8a201] focus:ring-[#f8a201]"
                />
                <label htmlFor="status-not-started" className="ml-2">Not Started</label>
              </div>
            </div>
          </div>
          
          {/* 题目分类筛选 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {problemCategories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                    className="h-4 w-4 text-[#f8a201] focus:ring-[#f8a201] rounded"
                  />
                  <label htmlFor={`category-${category.id}`} className="ml-2">{category.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 题目列表 */}
        <div className="flex-1 bg-white border border-[#dcdcdc] rounded-lg overflow-hidden flex flex-col">
          {/* 表头 */}
          <div className="grid grid-cols-12 border-b border-[#dcdcdc] bg-[#f9f9f9] p-3 font-medium text-sm">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-2 text-center">Difficulty</div>
            <div className="col-span-2 text-center">Acceptance</div>
            <div className="col-span-2 text-center">Status</div>
          </div>
          
          {/* 题目列表项 */}
          <div className="flex-1 overflow-y-auto">
            {currentProblems.length > 0 ? (
              currentProblems.map((problem, index) => (
                <Link href={`/problem/${problem.id}`} key={problem.id} className="block">
                  <div className="grid grid-cols-12 border-b border-[#dcdcdc] p-3 hover:bg-[#f9f9f9] transition-colors">
                    <div className="col-span-1 text-center font-mono">{problem.id}</div>
                    <div className="col-span-5">
                      <div className="font-medium">{problem.title}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {problem.tags.map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 bg-[#e1ecf4] text-[#0f4b6e] rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2 text-center flex items-center justify-center">
                      <span className={`
                        ${problem.difficulty === "Easy" ? "text-green-600" : 
                          problem.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"}
                      `}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="col-span-2 text-center flex items-center justify-center">
                      {problem.acceptance}
                    </div>
                    <div className="col-span-2 text-center flex items-center justify-center">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        problem.status === "Completed" ? "bg-green-100 text-green-800" : 
                        problem.status === "Attempted" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {problem.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12">
                <Frown className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No matching problems found</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDifficulty([]);
                    setSelectedCategories([]);
                    setStatusFilter("all");
                  }}
                  className="mt-4 text-[#0f4b6e] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
          
          {/* 分页 */}
          {filteredProblems.length > 0 && (
            <div className="flex justify-between items-center border-t border-[#dcdcdc] p-3 bg-[#f9f9f9]">
              <div className="text-sm text-[#808080]">
                Showing {indexOfFirstProblem + 1}-{Math.min(indexOfLastProblem, filteredProblems.length)} of {filteredProblems.length} results
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white border border-[#dcdcdc] hover:bg-[#f0f0f0]'
                  }`}
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded ${
                        currentPage === pageNum
                          ? 'bg-[#0f4b6e] text-white'
                          : 'bg-white border border-[#dcdcdc] hover:bg-[#f0f0f0]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button 
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white border border-[#dcdcdc] hover:bg-[#f0f0f0]'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Problem;