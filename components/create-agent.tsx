"use client";

import { useAgentStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const AI_MODELS = [
  {
    id: "claude-3-haiku",
    name: "Claude-3-Haiku",
    description:
      "Anthropic's Claude 3 Haiku outperforms models in its intelligence category on performance, speed and cost.",
    icon: "https://zorgle.co.uk/wp-content/uploads/2024/11/Claude-ai-logo.png",
    official: true,
  },
  {
    id: "gpt-4-mini",
    name: "GPT-4o-Mini",
    description:
      "OpenAI's latest model. This intelligent small model is significantly smarter, cheaper, and just as fast as GPT-3.5 Turbo.",
    icon: "https://img.icons8.com/?size=192&id=TUk7vxvtu6hX&format=png",
    official: true,
  },
  {
    id: "claude-3-sonnet",
    name: "Claude-3.5-Sonnet",
    description:
      "Excels in complex tasks like coding, writing, analysis and visual processing.",
    icon: "https://zorgle.co.uk/wp-content/uploads/2024/11/Claude-ai-logo.png",
    official: true,
  },
  {
    id: "gpt-4",
    name: "GPT-4o",
    description:
      "OpenAI's most powerful model, providing more natural, engaging & tailored writing.",
    icon: "https://img.icons8.com/?size=192&id=TUk7vxvtu6hX&format=png",
    official: true,
  },
  {
    id: "grok-beta",
    name: "Grok Beta",
    description:
      "xAI's Grok model excels at real-time analysis and witty responses, with up-to-date knowledge.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt0sjj1uOlEovcvFDBXV2njxj5YNNMwM6YLA&s",
    official: true,
  },
  {
    id: "gemini",
    name: "Gemini",
    description:
      "Google's most capable AI model, optimized for multimodal tasks and real-world problem solving.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThr7qrIazsvZwJuw-uZCtLzIjaAyVW_ZrlEQ&s",
    official: true,
  },
];

export default function CreateAgent() {
  const setIsCreatingAgent = useAgentStore((state) => state.setIsCreatingAgent);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    model: "",
  });

  // Check mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch wallet balance
  useEffect(() => {
    const getBalance = async () => {
      if (publicKey && connection) {
        try {
          const bal = await connection.getBalance(publicKey);
          setBalance(bal / LAMPORTS_PER_SOL);
        } catch (e) {
          console.error("Failed to fetch balance:", e);
        }
      }
    };

    if (connected) {
      getBalance();
    } else {
      setBalance(null);
    }
  }, [publicKey, connection, connected]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) return;

    setIsLoading(true);
    setLoadingText("We are checking your wallet address...");

    // Simulate checking wallet address
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoadingText("Creating your agent...");

    // Keep it in loading state forever
    // Remove the following lines:
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // setIsLoading(false);
    // setLoadingText("");
  };

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCreatingAgent(false)}
            className="rounded-xl p-2 text-white/60 hover:bg-white/5 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-lg font-medium">Create Your Agent</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {!connected ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-6 rounded-full bg-white/5 p-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#4C83ff"
                  strokeWidth="2"
                />
                <path
                  d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                  stroke="#4C83ff"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium">Connect Your Wallet</h3>
            <p className="mb-6 text-center text-sm text-white/60">
              Connect your wallet to create and customize your AI trading agent
            </p>
            <WalletMultiButton className="bg-mercury-950 text-white hover:bg-mercury-900" />
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[#4C83ff] rounded-full animate-spin mb-4" />
            <p className="text-white/60 text-center animate-pulse">
              {loadingText}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Model Selection */}
            <div className="space-y-2">
              <label className="text-sm text-white/60">Choose AI Model</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AI_MODELS.map((model) => (
                  <div
                    key={model.id}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, model: model.id }))
                    }
                    className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.model === model.id
                        ? "border-[#4C83ff] bg-[#4C83ff]/10"
                        : "border-white/10 hover:border-white/20 bg-[#272831]"
                    }`}
                  >
                    <div className="size-[60px] rounded-full overflow-hidden bg-black/20 flex-shrink-0">
                      <img
                        src={model.icon}
                        alt={model.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-white">
                          {model.name}
                        </h3>
                        {model.official && (
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-medium text-white/60">
                            OFFICIAL
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-white/60 line-clamp-2">
                        {model.description}
                      </p>
                    </div>
                    {formData.model === model.id && (
                      <div className="absolute top-4 right-4">
                        <div className="h-4 w-4 rounded-full bg-[#4C83ff] flex items-center justify-center">
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Existing form fields */}
            <div className="space-y-2">
              <label className="text-sm text-white/60">Agent Name</label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter agent name"
                className="bg-[#272831] border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/60">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your agent"
                className="bg-[#272831] border-white/10 text-white placeholder:text-white/40 min-h-[120px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#4C83ff] hover:bg-[#4C83ff]/90"
              disabled={
                !formData.name || !formData.description || !formData.model
              }
            >
              Create Agent
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
