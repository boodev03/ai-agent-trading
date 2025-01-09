"use client";

import { useAgentStore } from "@/lib/store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";

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
          // Connected - show create form
          <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled={!formData.name || !formData.description}
            >
              Create Agent
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
