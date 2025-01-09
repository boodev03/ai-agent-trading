import { create } from "zustand";
import { agents } from "@/data";

export interface Agent {
    id: string;
    name: string;
    avatar: string;
    video?: string;
    website: string;
    telegram: string;
    twitter: string;
    contract: string;
    token: string;
    members: number;
}

interface AgentStore {
    selectedAgent: Agent | null;
    setSelectedAgent: (agent: Agent) => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
    selectedAgent: agents[0],
    setSelectedAgent: (agent) => set({ selectedAgent: agent }),
}));