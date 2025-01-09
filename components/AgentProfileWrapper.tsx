"use client";
import AgentProfile from "./agent-profile";
import Chat from "./chat";
import Header from "./header";

export default function AgentProfileWrapper() {
  return (
    <div className="flex-1">
      <Header />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 h-auto lg:h-[calc(100vh-64px)] p-4 lg:p-0">
        <div className="w-full lg:w-auto">
          <AgentProfile />
        </div>
        <div className="flex-1 min-w-0 h-full max-h-full overflow-hidden">
          <Chat />
        </div>
      </div>
    </div>
  );
}
