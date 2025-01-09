"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import QRCodeModal from "./qr-code-modal";
import { useAgentStore } from "@/lib/store";
import { getProvider, type PhantomProvider } from "@/lib/wallet";

export default function Header() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const selectedAgent = useAgentStore((state) => state.selectedAgent);
  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );
  const [walletKey, setWalletKey] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Check wallet connection on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const provider = getProvider();
        setProvider(provider);

        if (provider) {
          try {
            // Try to reconnect if previously connected
            const response = await provider.connect();
            setWalletKey(response.publicKey.toString());
            localStorage.setItem("walletKey", response.publicKey.toString());
          } catch (error) {
            // If not already connected, try to get from localStorage
            const savedWalletKey = localStorage.getItem("walletKey");
            if (savedWalletKey) {
              setWalletKey(savedWalletKey);
            }
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setMounted(true);
      }
    };

    checkWalletConnection();
  }, []);

  // Handle wallet events
  useEffect(() => {
    if (provider) {
      provider.on("connect", (publicKey: any) => {
        const walletAddress = publicKey.toString();
        setWalletKey(walletAddress);
        localStorage.setItem("walletKey", walletAddress);
      });

      provider.on("disconnect", () => {
        setWalletKey(undefined);
        localStorage.removeItem("walletKey");
      });

      provider.on("accountChanged", (publicKey: any) => {
        if (publicKey) {
          const walletAddress = publicKey.toString();
          setWalletKey(walletAddress);
          localStorage.setItem("walletKey", walletAddress);
        } else {
          setWalletKey(undefined);
          localStorage.removeItem("walletKey");
        }
      });

      return () => {
        provider.removeAllListeners("connect");
        provider.removeAllListeners("disconnect");
        provider.removeAllListeners("accountChanged");
      };
    }
  }, [provider]);

  const connectWallet = async () => {
    try {
      if (!provider) {
        window.open("https://phantom.app/", "_blank");
        return;
      }
      const { publicKey } = await provider.connect();
      const walletAddress = publicKey.toString();
      setWalletKey(walletAddress);
      localStorage.setItem("walletKey", walletAddress);
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (provider) {
        await provider.disconnect();
        setWalletKey(undefined);
        localStorage.removeItem("walletKey");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!mounted) return null;

  return (
    <>
      <div className="w-full flex-1 px-4 pb-2 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-x-3">
                {/* Avatar with Status */}
                <div className="relative inline-flex shrink-0 h-fit">
                  <div className="overflow-hidden rounded-full border-1 bg-mercury-100 relative h-[38px] w-[38px] border-white outline outline-2 outline-[#FF075A]">
                    <Image
                      className="h-full w-full object-cover"
                      src={selectedAgent?.avatar || ""}
                      alt={selectedAgent?.name || "avatar"}
                      width={38}
                      height={38}
                    />
                  </div>
                  <span className="flex flex-wrap bg-red-500 absolute box-border rounded-full whitespace-nowrap place-content-center origin-center items-center select-none font-regular scale-100 opacity-100 subpixel-antialiased data-[invisible=true]:scale-0 data-[invisible=true]:opacity-0 text-small px-0 border-transparent border-0 text-default-foreground min-w-5 min-h-5 translate-x-1/2 translate-y-1/2 w-[18px] h-[18px] right-[15%] bottom-[15%] z-1 bg-lgd-code-hot-ramp">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M10.7123 11.2958C11.4466 10.5616 11.9466 9.62609 12.1491 8.6077C12.3517 7.5893 12.2477 6.5337 11.8504 5.57439C11.453 4.61508 10.7801 3.79515 9.91674 3.21828C9.05338 2.6414 8.03835 2.3335 7 2.3335C5.96165 2.3335 4.94662 2.6414 4.08327 3.21828C3.21991 3.79515 2.547 4.61508 2.14964 5.57439C1.75228 6.5337 1.64831 7.5893 1.85087 8.6077C2.05344 9.62609 2.55345 10.5616 3.28767 11.2958"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M9.06234 9.64627C9.47017 9.23834 9.74788 8.71863 9.86036 8.15288C9.97283 7.58712 9.91503 7.00072 9.69425 6.46781C9.47347 5.9349 9.09964 5.47943 8.62001 5.15897C8.14038 4.83852 7.57651 4.66748 6.99968 4.66748C6.42285 4.66748 5.85897 4.83852 5.37934 5.15897C4.89972 5.47943 4.52588 5.9349 4.3051 6.46781C4.08432 7.00072 4.02652 7.58712 4.139 8.15288C4.25147 8.71863 4.52918 9.23834 4.93701 9.64627"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6.41699 7.58333C6.41699 7.73804 6.47845 7.88642 6.58785 7.99581C6.69724 8.10521 6.84562 8.16667 7.00033 8.16667C7.15504 8.16667 7.30341 8.10521 7.4128 7.99581C7.5222 7.88642 7.58366 7.73804 7.58366 7.58333C7.58366 7.42862 7.5222 7.28025 7.4128 7.17085C7.30341 7.06146 7.15504 7 7.00033 7C6.84562 7 6.69724 7.06146 6.58785 7.17085C6.47845 7.28025 6.41699 7.42862 6.41699 7.58333Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold">{selectedAgent?.name}</h1>
                <span className="rounded-full bg-[#FF4D4D] px-2 py-0.5 text-sm text-white">
                  ±{selectedAgent?.members.toLocaleString()}
                </span>
              </div>
              <button
                className="ml-1 hover:bg-white/5 p-2 rounded-xl transition-colors"
                onClick={() => setIsQRModalOpen(true)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15 6.66667C16.3807 6.66667 17.5 5.54738 17.5 4.16667C17.5 2.78596 16.3807 1.66667 15 1.66667C13.6193 1.66667 12.5 2.78596 12.5 4.16667C12.5 5.54738 13.6193 6.66667 15 6.66667Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 18.3333C16.3807 18.3333 17.5 17.214 17.5 15.8333C17.5 14.4526 16.3807 13.3333 15 13.3333C13.6193 13.3333 12.5 14.4526 12.5 15.8333C12.5 17.214 13.6193 18.3333 15 18.3333Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.15833 11.2583L12.85 14.575"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.8417 5.425L7.15833 8.74167"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
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

            {walletKey ? (
              <Button
                onClick={disconnectWallet}
                className="bg-mercury-950 text-white hover:bg-mercury-900 flex items-center gap-2 w-full md:w-auto"
              >
                <span className="h-2 w-2 rounded-full bg-green-400" />
                {formatWalletAddress(walletKey)}
              </Button>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-mercury-950 text-white hover:bg-mercury-900 w-full md:w-auto"
              >
                {provider ? "Connect Wallet" : "Install Phantom"}
              </Button>
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
