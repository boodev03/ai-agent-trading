"use client";

import { agents } from "@/data";
import { useAgentStore } from "@/lib/store";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Add this new messages data
const recentMessages = [
  {
    id: 1,
    name: "Max",
    avatar:
      "https://storage.distilled.ai/distill/avatar/3gyMehG5frLLRXC3Xu1KFKAVgaisvtixghLDhMiJv75x/890f8134-3005-4a89-b4f8-e31a77298ad5.jpeg",
    lastMessage: "Great! Let's catch up later",
    timestamp: "2h",
  },
  {
    id: 2,
    name: "Sarah",
    avatar:
      "https://storage.distilled.ai/distill/avatar/6pF126XC6ayV8jjCH5QfgKjzBt6ihQoaSGiMq7tzUnbs/81095d1d-dfc4-46d4-9dcf-daf2b2d4d0ba.png",
    lastMessage: "Did you see the new update?",
    timestamp: "3h",
  },
  {
    id: 3,
    name: "John",
    avatar: "https://storage.distilled.ai/avatar/gnrt_agent2.png",
    lastMessage: "Thanks for the help!",
    timestamp: "1d",
  },
];

interface LeftSidebarProps {
  isMobile?: boolean;
}

export default function LeftSidebar({ isMobile }: LeftSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showExpandedContent, setShowExpandedContent] = useState(true);
  const selectedAgent = useAgentStore((state) => state.selectedAgent);
  const setSelectedAgent = useAgentStore((state) => state.setSelectedAgent);

  const handleToggle = () => {
    if (isExpanded) {
      // When collapsing: fade out content first, then collapse width
      setShowExpandedContent(false);
      setTimeout(() => setIsExpanded(false), 180);
    } else {
      // When expanding: expand width first, then fade in content
      setIsExpanded(true);
      setTimeout(() => setShowExpandedContent(true), 180);
    }
  };

  return (
    <div
      className={`relative flex h-full flex-col bg-[#1B1C22] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] border-r border-white/10 ${
        isMobile ? "pt-16 w-[280px]" : isExpanded ? "w-[280px]" : "w-[80px]"
      }`}
    >
      {/* Hide collapse button on mobile */}
      {!isMobile && (
        <button
          onClick={handleToggle}
          className="absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#1B1C22] transition-all hover:bg-[#272831]"
        >
          <ChevronLeft
            className={`h-4 w-4 text-white transition-all ${
              isExpanded ? "" : "rotate-180"
            }`}
          />
        </button>
      )}

      {/* Content Wrapper - Make it scrollable */}
      <div
        className={`flex flex-col h-full transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isExpanded ? "px-4" : "px-3"
        }`}
      >
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-track-[#1B1C22] scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
          {/* Clans Section */}
          <div className="py-6">
            <h2
              className={`mb-3 text-sm font-semibold text-white/60 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isExpanded ? "text-left px-2" : "text-center"
              }`}
            >
              {isExpanded ? "Your Clans" : "Clans"}
            </h2>
            {/* Clan Items */}
            <div className="space-y-2">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`group relative flex cursor-pointer items-center transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                    isExpanded
                      ? "gap-3 rounded-2xl p-2"
                      : "justify-center rounded-xl py-2"
                  } hover:bg-white/5 ${
                    selectedAgent?.id === agent.id ? "bg-white/5" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <div className="overflow-hidden rounded-xl border border-white/10">
                      <Image
                        src={agent.avatar}
                        alt={agent.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Clan Info */}
                  {isExpanded && (
                    <div
                      className={`flex-1 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                        showExpandedContent
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }`}
                    >
                      <h3 className="truncate text-sm font-medium text-white">
                        {agent.name}
                      </h3>
                      <p className="truncate text-xs text-white/60">
                        ±{agent.members} members
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Messages Section */}
          <div className="py-6">
            <h2
              className={`mb-3 text-sm font-semibold text-white/60 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isExpanded ? "text-left px-2" : "text-center"
              }`}
            >
              Messages
            </h2>
            <div className="space-y-2">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`group relative flex cursor-pointer items-center transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                    isExpanded
                      ? "gap-3 rounded-2xl p-2"
                      : "justify-center rounded-xl py-2"
                  } hover:bg-white/5`}
                >
                  {/* Avatar */}
                  <div className="relative h-10 w-10 flex-shrink-0">
                    <div className="overflow-hidden rounded-full border border-white/10">
                      <Image
                        src={message.avatar}
                        alt={message.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Message Info */}
                  {isExpanded && (
                    <div
                      className={`flex-1 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                        showExpandedContent
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="truncate text-sm font-medium text-white">
                          {message.name}
                        </h3>
                        <span className="text-xs text-white/40">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="truncate text-xs text-white/60">
                        {message.lastMessage}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-none border-t border-white/10">
          <div className="p-4">
            <a
              href="https://x.com/distilled_AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl hover:bg-white/5 hover:text-white/80 transition-all w-10 h-10"
              title="X"
            >
              <span className="flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 19 18" fill="none">
                  <path
                    d="M14.7033 0.875H17.4599L11.4374 7.75833L18.5224 17.125H12.9749L8.62992 11.4442L3.65825 17.125H0.899922L7.34159 9.7625L0.544922 0.875H6.23326L10.1608 6.0675L14.7033 0.875ZM13.7358 15.475H15.2633L5.40326 2.43833H3.76409L13.7358 15.475Z"
                    fill="currentColor"
                    fillOpacity="0.6"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
