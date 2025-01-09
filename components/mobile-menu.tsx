"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import LeftSidebar from "./left-sidebar";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md2:hidden fixed left-4 top-4 z-20 rounded-xl bg-[#1B1C22] p-2 hover:bg-[#272831] transition-colors border border-white/10"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md2:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[280px] transform bg-[#1B1C22] transition-transform duration-300 ease-out md2:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button - Inside menu */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-50 rounded-xl p-2 hover:bg-white/5 transition-colors"
        >
          <X className="h-5 w-5 text-white/60" />
        </button>

        <LeftSidebar isMobile={true} />
      </div>
    </>
  );
}
