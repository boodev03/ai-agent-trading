"use client";

import { useAgentStore } from "@/lib/store";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { format } from "date-fns";

// Dummy messages for different users
const userChats = {
  "1": [
    // Max's chat about BTC/ETH
    {
      id: "1",
      isUser: true,
      content: "Hey! Have you seen BTC price today? 🚀",
      timestamp: new Date(Date.now() - 3600000 * 5),
    },
    {
      id: "2",
      isUser: false,
      content: "Yeah! Finally broke $72k resistance. This bull run is insane!",
      timestamp: new Date(Date.now() - 3600000 * 4.8),
    },
    {
      id: "3",
      isUser: true,
      content: "What's your take on ETH? Think it'll follow?",
      timestamp: new Date(Date.now() - 3600000 * 4.5),
    },
    {
      id: "4",
      isUser: false,
      content:
        "ETH looking very strong. The merge success + institutional adoption = 🌙",
      timestamp: new Date(Date.now() - 3600000 * 4.3),
    },
    {
      id: "5",
      isUser: true,
      content: "My portfolio is 60% ETH, 30% BTC, 10% SOL. Thoughts?",
      timestamp: new Date(Date.now() - 3600000 * 4),
    },
    {
      id: "6",
      isUser: false,
      content: "Solid allocation! Maybe add some MATIC for L2 exposure?",
      timestamp: new Date(Date.now() - 3600000 * 3.8),
    },
    {
      id: "7",
      isUser: true,
      content: "Good point! Any price targets for BTC this cycle?",
      timestamp: new Date(Date.now() - 3600000 * 3.5),
    },
    {
      id: "8",
      isUser: false,
      content: "$100k seems realistic with ETF flows and halving coming up 📈",
      timestamp: new Date(Date.now() - 3600000 * 3.3),
    },
  ],
  "2": [
    // Sarah's chat about NFTs
    {
      id: "1",
      isUser: true,
      content: "What do you think about the new SOL NFT marketplace?",
      timestamp: new Date(Date.now() - 3600000 * 3),
    },
    {
      id: "2",
      isUser: false,
      content: "It's amazing! The volume is growing exponentially 📈",
      timestamp: new Date(Date.now() - 3600000 * 2.8),
    },
    {
      id: "3",
      isUser: true,
      content: "Any specific collections you're watching?",
      timestamp: new Date(Date.now() - 3600000 * 2.5),
    },
    {
      id: "4",
      isUser: false,
      content: "Mad Lads and Famous Fox Federation looking strong!",
      timestamp: new Date(Date.now() - 3600000 * 2.3),
    },
    {
      id: "5",
      isUser: true,
      content: "What about Tensorians? Heard they're launching soon",
      timestamp: new Date(Date.now() - 3600000 * 2),
    },
    {
      id: "6",
      isUser: false,
      content: "Yes! The team is solid and roadmap looks promising 🎯",
      timestamp: new Date(Date.now() - 3600000 * 1.8),
    },
    {
      id: "7",
      isUser: true,
      content: "Might ape in. Floor price prediction?",
      timestamp: new Date(Date.now() - 3600000 * 1.5),
    },
  ],
  "3": [
    // John's chat about DeFi
    {
      id: "1",
      isUser: true,
      content: "Have you tried any of the new DeFi protocols on Base?",
      timestamp: new Date(Date.now() - 3600000 * 4),
    },
    {
      id: "2",
      isUser: false,
      content: "Yes! The Aerodrome fork is performing really well",
      timestamp: new Date(Date.now() - 3600000 * 3.8),
    },
    {
      id: "3",
      isUser: true,
      content: "APRs looking juicy? 👀",
      timestamp: new Date(Date.now() - 3600000 * 3.5),
    },
    {
      id: "4",
      isUser: false,
      content: "300%+ on some pools. But be careful of IL!",
      timestamp: new Date(Date.now() - 3600000 * 3.3),
    },
    {
      id: "5",
      isUser: true,
      content: "What's your favorite Base token right now?",
      timestamp: new Date(Date.now() - 3600000 * 3),
    },
    {
      id: "6",
      isUser: false,
      content: "AERO looking strong. Solid tokenomics and growing ecosystem 🚀",
      timestamp: new Date(Date.now() - 3600000 * 2.8),
    },
    {
      id: "7",
      isUser: true,
      content: "Any other L2s you're bullish on?",
      timestamp: new Date(Date.now() - 3600000 * 2.5),
    },
    {
      id: "8",
      isUser: false,
      content: "ZkSync and Starknet looking promising for long term 💎",
      timestamp: new Date(Date.now() - 3600000 * 2.3),
    },
  ],
};

export default function ChatOneToOne() {
  const selectedChat = useAgentStore((state) => state.selectedChat);
  const [messages, setMessages] = useState<
    (typeof userChats)[keyof typeof userChats]
  >([]);
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update messages when selected chat changes
  useEffect(() => {
    if (selectedChat) {
      setMessages(userChats[selectedChat.id as keyof typeof userChats] || []);
    }
  }, [selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle send message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      isUser: true,
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Simulate reply after 1 second
    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        isUser: false,
        content: "Thanks for the message! I'll look into that 👍",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  if (!selectedChat) return null;

  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b border-white/10 p-4">
        <div className="relative h-10 w-10">
          <Image
            src={selectedChat.avatar}
            alt={selectedChat.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[#1B1C22]" />
        </div>
        <div>
          <h3 className="font-medium text-white">{selectedChat.name}</h3>
          <p className="text-sm text-white/60">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl ${
                  message.isUser
                    ? "bg-[#4C83ff] rounded-tr-sm"
                    : "bg-[#272831] rounded-tl-sm"
                } p-3 text-white`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="mt-1 block text-[10px] text-white/60">
                  {format(message.timestamp, "h:mm a")}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-none border-t border-white/10 p-4">
        <div
          className={`flex items-center gap-2 rounded-xl border border-white/10 bg-[#272831] p-2 transition-all ${
            isFocused ? "border-white/20" : ""
          }`}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 bg-transparent px-2 text-white outline-none placeholder:text-white/40"
          />
          <Button
            className="h-10 rounded-lg bg-[#4C83ff] px-4 hover:bg-[#4C83ff]/90"
            disabled={!inputText.trim()}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
