"use client";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row gap-4">
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => window.location.href = "/battle"}>Login</button>
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => window.location.href = "/battle"}>Signup</button>
      </div>
    </div>
  );
}
