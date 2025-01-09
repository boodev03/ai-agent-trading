"use client";

import { X } from "lucide-react";
import QRCode from "./qr-code";
import { useEffect, useState } from "react";
import { useAgentStore } from "@/lib/store";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  const [showContent, setShowContent] = useState(false);
  const selectedAgent = useAgentStore((state) => state.selectedAgent);

  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger animation after modal is mounted
      const timer = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timer);
    }
    setShowContent(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveImage = async () => {
    try {
      const response = await fetch(
        "https://img.abyssale.com/574bfa75-c880-46be-97ae-599473818958"
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr-code.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${
        showContent ? "bg-black/60 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-[320px] rounded-2xl bg-[#1B1C22] p-6 border border-white/10 transition-all duration-300 ease-out ${
          showContent
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">QR Code</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5 text-white/60" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div
            className={`relative w-full aspect-square bg-white rounded-xl p-4 transition-all duration-300 delay-100 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <QRCode size={280} logo={selectedAgent?.avatar} />
          </div>

          <div
            className={`flex w-full gap-2 transition-all duration-300 delay-150 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <button
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#272831] hover:bg-[#323442] h-11 text-sm font-medium text-white/80 transition-colors border border-white/10"
              onClick={handleSaveImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M17.5 12.5v2.5a2.5 2.5 0 0 1-2.5 2.5H5a2.5 2.5 0 0 1-2.5-2.5v-2.5" />
                <path d="M10 15V5" />
                <path d="m6.25 8.75 3.75-3.75 3.75 3.75" />
              </svg>
              Save image
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#272831] hover:bg-[#323442] h-11 text-sm font-medium text-white/80 transition-colors border border-white/10"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M15 7.5v-5h-5" />
                <path d="M15 2.5 8.75 8.75" />
                <path d="M10 5H5a2.5 2.5 0 0 0-2.5 2.5v7.5A2.5 2.5 0 0 0 5 17.5h7.5a2.5 2.5 0 0 0 2.5-2.5V10" />
              </svg>
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
