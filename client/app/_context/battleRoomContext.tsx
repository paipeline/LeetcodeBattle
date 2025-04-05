"use client";

import { createContext, useState } from "react";

interface BattleRoomContextType {
  roomId: string | null;
  setRoomId: (id: string) => void;
  roomName: string | null;
  setRoomName: (name: string) => void;
  roomCreater: string | null;
  setRoomCreater: (creater: string) => void;
  roomDifficulty: string | null;
  setRoomDifficulty: (difficulty: string) => void;
  roomPlayers: number | null;
  setRoomPlayers: (players: number) => void;
  roomMaxPlayers: number | null;
  setRoomMaxPlayers: (maxPlayers: number) => void;
  roomProblems: number | null;
  setRoomProblems: (problems: number) => void;
  roomStatus: string | null;
  setRoomStatus: (status: string) => void;
  roomCreatedAt: string | null;
  setRoomCreatedAt: (createdAt: string) => void;
}

const defaultContext: BattleRoomContextType = {
  roomId: null,
  setRoomId: () => {},
  roomName: null,
  setRoomName: () => {},
  roomCreater: null,
  setRoomCreater: () => {},
  roomDifficulty: null,
  setRoomDifficulty: () => {},
  roomPlayers: null,
  setRoomPlayers: () => {},
  roomMaxPlayers: null,
  setRoomMaxPlayers: () => {},
  roomProblems: null,
  setRoomProblems: () => {},
  roomStatus: null,
  setRoomStatus: () => {},
  roomCreatedAt: null,
  setRoomCreatedAt: () => {},
};

export const BattleRoomContext = createContext<BattleRoomContextType>(defaultContext);

export const BattleRoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [roomCreater, setRoomCreater] = useState<string | null>(null);
  const [roomDifficulty, setRoomDifficulty] = useState<string | null>(null);
  const [roomPlayers, setRoomPlayers] = useState<number | null>(null);
  const [roomMaxPlayers, setRoomMaxPlayers] = useState<number | null>(null);
  const [roomProblems, setRoomProblems] = useState<number | null>(null);
  const [roomStatus, setRoomStatus] = useState<string | null>(null);
  const [roomCreatedAt, setRoomCreatedAt] = useState<string | null>(null);

  return (
    <BattleRoomContext.Provider value={{
      roomId,
      setRoomId,
      roomName,
      setRoomName,
      roomCreater,
      setRoomCreater,
      roomDifficulty,
      setRoomDifficulty,
      roomPlayers,
      setRoomPlayers,
      roomMaxPlayers,
      setRoomMaxPlayers,
      roomProblems,
      setRoomProblems,
      roomStatus,
      setRoomStatus,
      roomCreatedAt,
      setRoomCreatedAt,
    }}>
      {children}
    </BattleRoomContext.Provider>
  );
};

export default BattleRoomProvider;