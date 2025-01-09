"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { format } from "date-fns";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  avatar?: string;
  username?: string;
  replyTo?: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Late night vibes",
    sender: "user",
    timestamp: new Date("2024-03-20T10:00:00"),
    username: "babytee",
  },
  {
    id: "2",
    text: "Late night vibes",
    sender: "agent",
    timestamp: new Date("2024-03-20T10:01:00"),
    avatar:
      "https://storage.distilled.ai/distill/avatar/3gyMehG5frLLRXC3Xu1KFKAVgaisvtixghLDhMiJv75x/890f8134-3005-4a89-b4f8-e31a77298ad5.jpeg",
    username: "Max",
    replyTo: "babytee",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex flex-col h-full flex-1 z-[11] bg-[#1B1C22] rounded-2xl border border-white/10 overflow-hidden">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-6 p-4">
            {messages.map((message, index) => {
              const isFirstMessageOfDay =
                index === 0 ||
                !isSameDay(message.timestamp, messages[index - 1].timestamp);
              const isConsecutiveMessage =
                index > 0 &&
                message.sender === messages[index - 1].sender &&
                message.username === messages[index - 1].username &&
                !isFirstMessageOfDay;

              return (
                <div key={message.id} className="space-y-2">
                  {isFirstMessageOfDay && (
                    <div className="flex justify-center">
                      <span className="text-xs text-white/60 bg-[#111319] px-3 py-1 rounded-full">
                        {format(message.timestamp, "MMMM d, yyyy")}
                      </span>
                    </div>
                  )}
                  <article className="flex gap-3">
                    {/* Avatar */}
                    {!isConsecutiveMessage && (
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#111319] border border-white/10">
                        {message.avatar ? (
                          <Image
                            src={message.avatar}
                            alt="avatar"
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-sm text-white/80">
                            {message.username?.[0] || "U"}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Message Content */}
                    <div className="flex flex-col flex-1 ">
                      {!isConsecutiveMessage && (
                        <span className="text-xs text-white/60 mb-1 px-1">
                          {message.username}
                        </span>
                      )}
                      <div
                        className={`max-w-[80%] w-max inline-flex flex-col ${
                          isConsecutiveMessage ? "ml-11" : ""
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-[#4C83ff]"
                              : "bg-[#1B1C22] border border-white/10"
                          }`}
                        >
                          <p className="text-sm break-words whitespace-pre-wrap">
                            {message.text}
                          </p>
                        </div>
                        <span className="text-[10px] text-white/40 px-1 mt-1">
                          {format(message.timestamp, "h:mm a")}
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Input */}
      <div className="sticky bottom-0 left-0 right-0 bg-[#1B1C22] border-t border-white/10">
        <div className="absolute inset-x-0 bottom-full h-8 bg-gradient-to-t from-[#1B1C22] to-transparent" />
        <div className="p-4">
          <div
            className={`group flex w-full items-center gap-3 rounded-[35px] border bg-[#111319] px-4 py-2.5 transition-all ${
              isFocused
                ? "border-[#4C83ff]"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            {/* Attachment Button */}
            <button className="flex-shrink-0 p-1.5 hover:bg-white/5 rounded-full transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M16.6663 9.16667L10.4163 15.4167C9.61744 16.2156 8.53952 16.6665 7.41634 16.6665C6.29316 16.6665 5.21524 16.2156 4.41634 15.4167C3.61744 14.6178 3.16650 13.5399 3.16650 12.4167C3.16650 11.2935 3.61744 10.2156 4.41634 9.41667L10.6663 3.16667C11.1991 2.63388 11.9206 2.33337 12.6663 2.33337C13.4121 2.33337 14.1336 2.63388 14.6663 3.16667C15.1991 3.69945 15.4997 4.42095 15.4997 5.16667C15.4997 5.91239 15.1991 6.63388 14.6663 7.16667L8.41634 13.4167C8.14995 13.6831 7.78920 13.8333 7.41634 13.8333C7.04348 13.8333 6.68273 13.6831 6.41634 13.4167C6.14995 13.1503 5.99973 12.7896 5.99973 12.4167C5.99973 12.0438 6.14995 11.6831 6.41634 11.4167L12.0830 5.75"
                  stroke="#545454"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Text Input */}
            <textarea
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 resize-none bg-transparent text-sm outline-none min-h-[24px] max-h-[120px] placeholder:text-white/40 text-white leading-normal focus:outline-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!inputText.trim()) return;
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: Date.now().toString(),
                      text: inputText.trim(),
                      sender: "user",
                      timestamp: new Date(),
                      username: "You",
                    },
                  ]);
                  setInputText("");
                }
              }}
            />

            {/* Audio Chat Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-white/5 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame">
                  <path
                    id="Vector"
                    d="M15.833 7.49992C16.054 7.49992 16.266 7.58772 16.4223 7.744C16.5785 7.90028 16.6663 8.11224 16.6663 8.33325C16.6665 9.95702 16.0741 11.525 15.0002 12.743C13.9263 13.9609 12.4448 14.7451 10.8338 14.9483L10.833 16.6666H13.333C13.554 16.6666 13.766 16.7544 13.9223 16.9107C14.0785 17.0669 14.1663 17.2789 14.1663 17.4999C14.1663 17.7209 14.0785 17.9329 13.9223 18.0892C13.766 18.2455 13.554 18.3333 13.333 18.3333H6.66634C6.44533 18.3333 6.23337 18.2455 6.07709 18.0892C5.92081 17.9329 5.83301 17.7209 5.83301 17.4999C5.83301 17.2789 5.92081 17.0669 6.07709 16.9107C6.23337 16.7544 6.44533 16.6666 6.66634 16.6666H9.16634V14.9483C7.55519 14.7453 6.07352 13.9612 4.99947 12.7432C3.92542 11.5253 3.33286 9.95714 3.33301 8.33325C3.33301 8.11224 3.42081 7.90028 3.57709 7.744C3.73337 7.58772 3.94533 7.49992 4.16634 7.49992C4.38735 7.49992 4.59932 7.58772 4.7556 7.744C4.91188 7.90028 4.99967 8.11224 4.99967 8.33325C4.99967 9.65933 5.52646 10.9311 6.46414 11.8688C7.40182 12.8065 8.67359 13.3333 9.99967 13.3333C11.3258 13.3333 12.5975 12.8065 13.5352 11.8688C14.4729 10.9311 14.9997 9.65933 14.9997 8.33325C14.9997 8.11224 15.0875 7.90028 15.2438 7.744C15.4 7.58772 15.612 7.49992 15.833 7.49992ZM9.99967 0.833252C10.8837 0.833252 11.7316 1.18444 12.3567 1.80956C12.9818 2.43468 13.333 3.28253 13.333 4.16659V8.33325C13.333 9.21731 12.9818 10.0652 12.3567 10.6903C11.7316 11.3154 10.8837 11.6666 9.99967 11.6666C9.11562 11.6666 8.26777 11.3154 7.64265 10.6903C7.01753 10.0652 6.66634 9.21731 6.66634 8.33325V4.16659C6.66634 3.28253 7.01753 2.43468 7.64265 1.80956C8.26777 1.18444 9.11562 0.833252 9.99967 0.833252Z"
                    fill="#545454"
                  />
                </g>
              </svg>
            </Button>

            {/* Send Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-[#4C83ff] text-white hover:bg-[#4C83ff]/90 disabled:opacity-50 flex-shrink-0 transition-all"
              disabled={!inputText.trim()}
              onClick={() => {
                if (!inputText.trim()) return;
                setMessages((prev) => [
                  ...prev,
                  {
                    id: Date.now().toString(),
                    text: inputText.trim(),
                    sender: "user",
                    timestamp: new Date(),
                    username: "You",
                  },
                ]);
                setInputText("");
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
