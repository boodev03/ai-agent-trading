"use client";

import { useAgentStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  // Check wallet connection on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        // @ts-ignore
        const { solana } = window;

        if (solana && solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          const address = response.publicKey.toString();
          setAddress(address);
          setIsConnected(true);
          localStorage.setItem("walletAddress", address);
        }
      } catch (error) {
        // If not already connected, try to get from localStorage
        const savedAddress = localStorage.getItem("walletAddress");
        if (savedAddress) {
          setAddress(savedAddress);
          setIsConnected(true);
        }
      } finally {
        setMounted(true);
      }
    };

    checkWalletConnection();
  }, []);

  const connectWallet = async () => {
    try {
      // @ts-ignore
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect();
          const address = response.publicKey.toString();
          setAddress(address);
          setIsConnected(true);
          localStorage.setItem("walletAddress", address);
        }
      } else {
        window.open("https://phantom.app/", "_blank");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle wallet change or disconnect
  useEffect(() => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      solana.on("accountChanged", async () => {
        try {
          const response = await solana.connect({ onlyIfTrusted: true });
          const newAddress = response.publicKey.toString();
          setAddress(newAddress);
          localStorage.setItem("walletAddress", newAddress);
        } catch (error) {
          setIsConnected(false);
          setAddress("");
          localStorage.removeItem("walletAddress");
        }
      });

      solana.on("disconnect", () => {
        setIsConnected(false);
        setAddress("");
        localStorage.removeItem("walletAddress");
      });
    }

    return () => {
      if (solana) {
        solana.removeAllListeners("accountChanged");
        solana.removeAllListeners("disconnect");
      }
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    model: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingText("We are checking your wallet address...");

    // Simulate checking wallet address
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoadingText("Creating your agent...");

    // Keep it in loading state forever
  };

  if (!mounted) return null;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div>
          <h2 className="text-xl font-medium text-white">Create Your Agent</h2>
          {isConnected && (
            <p className="text-sm text-white/60 mt-1">
              Connected: {address.slice(0, 4)}...{address.slice(-4)}
            </p>
          )}
        </div>
        <button
          onClick={() => setIsCreatingAgent(false)}
          className="rounded-lg p-2 text-white/60 hover:bg-white/5"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {!isConnected ? (
          // Not connected - show connect button
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-white/60 mb-4 text-center">
              Please connect your Phantom wallet to create an agent
            </p>
            <Button
              onClick={connectWallet}
              className="bg-[#4C83ff] hover:bg-[#4C83ff]/90"
            >
              Connect Phantom Wallet
            </Button>
          </div>
        ) : isLoading ? (
          // Loading state - now can stay forever
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
