"use client";

import { useAgentStore } from "@/lib/store";
import AgentProfile from "./agent-profile";
import Chat from "./chat";
import ChatOneToOne from "./chat-one-to-one";
import Header from "./header";
import CreateAgent from "./create-agent";

export default function AgentProfileWrapper() {
  const selectedChat = useAgentStore((state) => state.selectedChat);
  const isCreatingAgent = useAgentStore((state) => state.isCreatingAgent);

  return (
    <div className="flex-1">
      {!selectedChat && !isCreatingAgent && <Header />}
      {selectedChat ? (
        // Show 1-1 chat when message is selected
        <div className="h-screen">
          <ChatOneToOne />
        </div>
      ) : isCreatingAgent ? (
        // Show create agent UI when creating
        <div className="h-screen">
          <CreateAgent />
        </div>
      ) : (
        // Show clan content (profile + group chat) when viewing clan
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-10 min-h-[calc(100vh-64px)] p-4">
          <div className="w-full xl:w-auto flex justify-center">
            <AgentProfile />
          </div>
          <div className="flex-1 min-w-0 h-full max-h-full overflow-hidden">
            <Chat />
          </div>
        </div>
      )}
    </div>
  );
}
