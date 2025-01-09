"use client";

export default function CreateAgentPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Right Panel */}
      <div
        className={`relative z-10 w-full max-w-md bg-[#1B1C22] h-screen border-l border-white/10 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-medium text-white mb-4">
            Create Your Agent
          </h2>
          <p className="text-white/60">Hello, we'll create this UI later! 👋</p>

          <button
            onClick={onClose}
            className="mt-4 w-full rounded-xl bg-[#4C83ff] p-2 text-sm font-medium text-white hover:bg-[#4C83ff]/90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
