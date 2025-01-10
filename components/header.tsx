"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import QRCodeModal from "./qr-code-modal";
import { useAgentStore } from "@/lib/store";
import {
  useWallet,
  useConnection,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

require("@solana/wallet-adapter-react-ui/styles.css");

export default function Header() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const selectedAgent = useAgentStore((state) => state.selectedAgent);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  const { publicKey, connected, disconnect } = useWallet();
  const { connection } = useConnection();

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    setMounted(true);

    return () => window.removeEventListener("resize", checkIfMobile);
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

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!mounted) return null;

  return (
    <>
      <div className="w-full flex-1 px-4 pb-2 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {/* Left Side - Agent Info */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            {selectedAgent && (
              <div className="flex items-center gap-4">
                <div className="relative">
                  {/* ... rest of agent avatar and info JSX ... */}
                </div>
              </div>
            )}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
            {!isMobile && (
              <Button variant="ghost" className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10.8346 3V8.83333H15.8346L9.16797 18V12.1667H4.16797L10.8346 3Z"
                    fill="#F78500"
                  />
                </svg>
                <span className="text-sm font-medium">Earn $SOL</span>
              </Button>
            )}

            {connected ? (
              <Button
                onClick={() => disconnect()}
                className="bg-mercury-950 text-white hover:bg-mercury-900 flex items-center gap-2 w-full md:w-auto"
              >
                <span className="h-2 w-2 rounded-full bg-green-400" />
                {publicKey && formatWalletAddress(publicKey.toString())}
                {balance !== null && ` (${balance.toFixed(2)} SOL)`}
              </Button>
            ) : (
              <WalletMultiButton className="bg-mercury-950 text-white hover:bg-mercury-900 w-full md:w-auto" />
            )}
          </div>
        </div>
      </div>

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </>
  );
}
