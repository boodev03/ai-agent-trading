"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgentStore } from "@/lib/store";
import { useState } from "react";

export default function AgentProfile() {
  const [isMuted, setIsMuted] = useState(true);
  const selectedAgent = useAgentStore((state) => state.selectedAgent);

  const {
    name: agentName,
    avatar: agentAvatar,
    video: agentVideo,
    website,
    twitter,
    telegram,
    another,
    contract,
    desc,
    subDesc,
  } = selectedAgent || {};

  return (
    <div className="relative pb-5 flex w-full max-w-full flex-col overflow-y-auto transition-all duration-300 ease-linear scrollbar-hide max-md:px-4 xl:max-w-[320px]">
      <div className="mt-5 flex h-full flex-col md:h-fit">
        <div className="relative">
          <div className="relative overflow-hidden rounded-[24px] border border-white/10">
            {agentVideo ? (
              <video
                autoPlay
                playsInline
                loop
                muted={isMuted}
                className="h-full min-h-[350px] w-full object-contain max-h-[350px] md:max-h-[400px] md:h-auto"
              >
                <source src={agentVideo} type="video/mp4" />
              </video>
            ) : (
              <img
                src={another || agentAvatar}
                alt={agentName}
                className="h-full min-h-[350px] w-full object-contain max-h-[350px] md:max-h-[400px] md:h-auto"
              />
            )}

            {agentVideo && (
              <button
                type="button"
                className="absolute left-4 top-4 z-10 rounded-xl bg-black/20 p-2 backdrop-blur-sm hover:bg-black/30 transition-colors"
                onClick={() => setIsMuted(!isMuted)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M15.5 8C16.2483 8.56124 16.8242 9.32114 17.1622 10.1933C17.5002 11.0655 17.5867 12.0151 17.412 12.934M16.035 15.536C15.8679 15.7031 15.6891 15.8582 15.5 16M18.2 5C19.805 6.29704 20.9154 8.10621 21.3455 10.1244C21.7755 12.1427 21.4989 14.2474 20.562 16.086M18.886 18.385C18.668 18.6016 18.439 18.8068 18.2 19M9.569 5.054L10 4.5C10.0874 4.33023 10.2326 4.19732 10.4095 4.12529C10.5863 4.05326 10.7831 4.04686 10.9643 4.10724C11.1454 4.16763 11.299 4.29081 11.3972 4.45454C11.4955 4.61827 11.5319 4.81174 11.5 5V7M11.5 11V19C11.5319 19.1883 11.4955 19.3817 11.3972 19.5455C11.299 19.7092 11.1454 19.8324 10.9643 19.8928C10.7831 19.9531 10.5863 19.9467 10.4095 19.8747C10.2326 19.8027 10.0874 19.6698 10 19.5L6.5 15H4.5C4.23478 15 3.98043 14.8946 3.79289 14.7071C3.60536 14.5196 3.5 14.2652 3.5 14V10C3.5 9.73478 3.60536 9.48043 3.79289 9.29289C3.98043 9.10536 4.23478 9 4.5 9H6.5L7.794 7.336M3.5 3L21.5 21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 items-center justify-between gap-3 hidden md:flex">
          <Button
            className="flex-1 bg-[#1B1C22] hover:bg-[#272831] text-white h-11 rounded-xl border border-white/10 transition-colors"
            asChild
          >
            <a href={website} target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>
          </Button>
          <Button
            className="flex-1 bg-[#1B1C22] hover:bg-[#272831] text-white h-11 rounded-xl border border-white/10 transition-colors"
            asChild
          >
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 19 18"
                fill="none"
              >
                <path
                  d="M14.7033 0.875H17.4599L11.4374 7.75833L18.5224 17.125H12.9749L8.62992 11.4442L3.65825 17.125H0.899922L7.34159 9.7625L0.544922 0.875H6.23326L10.1608 6.0675L14.7033 0.875ZM13.7358 15.475H15.2633L5.40326 2.43833H3.76409L13.7358 15.475Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </Button>
          <Button
            className="flex-1 bg-[#1B1C22] hover:bg-[#272831] text-white h-11 rounded-xl border border-white/10 transition-colors"
            asChild
          >
            <a href={telegram} target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 10l-4 4l6 6l4-16l-18 7l4 2l2 6l3-4" />
              </svg>
            </a>
          </Button>
        </div>

        <div className="mt-4 hidden md:block">
          <Button
            className="w-full bg-[#4C83ff] hover:bg-[#4C83ff]/90 text-white h-12 rounded-xl border border-white/10 transition-colors"
            asChild
          >
            <a
              href="https://dexscreener.com/solana/4Qgn7AixnZJBwfFL5XmRDBVyzzq9tC6JdDToaKVhPJvz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M3 7.49984L6.33333 4.1665M6.33333 4.1665L9.66667 7.49984M6.33333 4.1665V15.8332M18 12.4998L14.6667 15.8332M14.6667 15.8332L11.3333 12.4998M14.6667 15.8332V4.1665"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base font-medium">Trade</span>
            </a>
          </Button>
        </div>

        <div className="mt-4 items-center justify-between gap-2 hidden md:flex">
          <span className="text-base font-semibold text-white/80">
            Contract
          </span>
          <div className="flex items-center gap-2 rounded-xl bg-[#1B1C22] px-3 py-2 hover:bg-[#272831] transition-colors border border-white/10 cursor-pointer">
            <img
              src="data:image/svg+xml,%3csvg%20width='21'%20height='21'%20viewBox='0%200%2021%2021'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Token_icon%20/%20SOL-Solana%20'%3e%3crect%20x='0.5'%20y='0.5'%20width='20'%20height='20'%20rx='10'%20fill='black'/%3e%3cpath%20id='Vector'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.67205%2013.2565C6.7097%2013.2151%206.75555%2013.182%206.8067%2013.1594C6.8578%2013.1367%206.91315%2013.125%206.96905%2013.125L16.133%2013.1325C16.1721%2013.1326%2016.2102%2013.144%2016.2429%2013.1653C16.2756%2013.1867%2016.3013%2013.2171%2016.317%2013.2528C16.3328%2013.2885%2016.3378%2013.328%2016.3315%2013.3665C16.3252%2013.405%2016.3078%2013.4409%2016.2815%2013.4697L14.33%2015.6185C14.2924%2015.6599%2014.2465%2015.693%2014.1953%2015.7156C14.1441%2015.7383%2014.0888%2015.75%2014.0328%2015.75L4.86906%2015.7425C4.83004%2015.7424%204.79187%2015.731%204.75921%2015.7096C4.72654%2015.6883%204.70078%2015.6579%204.68506%2015.6222C4.66933%2015.5865%204.66431%2015.5469%204.67061%2015.5084C4.67691%2015.4699%204.69427%2015.4341%204.72056%2015.4052L6.67205%2013.2565ZM16.2815%2011.4677C16.3078%2011.4966%2016.3252%2011.5324%2016.3315%2011.5709C16.3378%2011.6094%2016.3328%2011.649%2016.317%2011.6847C16.3013%2011.7204%2016.2756%2011.7508%2016.2429%2011.7721C16.2102%2011.7935%2016.1721%2011.8049%2016.133%2011.805L6.9693%2011.8125C6.91335%2011.8125%206.858%2011.8008%206.8068%2011.7781C6.7556%2011.7555%206.7097%2011.7224%206.67205%2011.681L4.72056%209.531C4.69427%209.50215%204.67691%209.4663%204.67061%209.4278C4.66431%209.3893%204.66933%209.34975%204.68506%209.31405C4.70078%209.27835%204.72654%209.24795%204.75921%209.2266C4.79187%209.20525%204.83004%209.19385%204.86906%209.19375L14.033%209.18625C14.089%209.1863%2014.1443%209.198%2014.1954%209.22065C14.2466%209.2433%2014.2924%209.27635%2014.33%209.31775L16.2815%2011.4677ZM6.67205%205.3815C6.7097%205.34011%206.75555%205.30704%206.8067%205.28439C6.8578%205.26175%206.91315%205.25003%206.96905%205.25L16.133%205.2575C16.1721%205.25758%2016.2102%205.26899%2016.2429%205.29034C16.2756%205.3117%2016.3013%205.34208%2016.317%205.3778C16.3328%205.41351%2016.3378%205.45303%2016.3315%205.49154C16.3252%205.53005%2016.3078%205.5659%2016.2815%205.59475L14.33%207.7435C14.2924%207.7849%2014.2465%207.818%2014.1953%207.84065C14.1441%207.8633%2014.0888%207.875%2014.0328%207.875L4.86906%207.8675C4.83004%207.8674%204.79187%207.856%204.75921%207.83465C4.72654%207.8133%204.70078%207.7829%204.68506%207.7472C4.66933%207.7115%204.66431%207.67195%204.67061%207.63345C4.67691%207.59495%204.69427%207.5591%204.72056%207.53025L6.67205%205.3815Z'%20fill='url(%23paint0_linear_4067_26402)'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_4067_26402'%20x1='5.02206'%20y1='15.979'%20x2='15.98'%20y2='5.021'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%239945FF'/%3e%3cstop%20offset='0.2'%20stop-color='%237962E7'/%3e%3cstop%20offset='1'%20stop-color='%2300D18C'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
              alt="Contract icon"
              className="h-5 w-5"
            />
            <span className="text-sm text-white/60">{contract}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5.83337 8.056C5.83337 7.46655 6.06753 6.90125 6.48433 6.48445C6.90113 6.06765 7.46643 5.8335 8.05587 5.8335H15.2775C15.5694 5.8335 15.8584 5.89098 16.1281 6.00267C16.3977 6.11437 16.6427 6.27807 16.8491 6.48445C17.0555 6.69083 17.2192 6.93584 17.3309 7.20548C17.4426 7.47513 17.5 7.76413 17.5 8.056V15.2777C17.5 15.5695 17.4426 15.8585 17.3309 16.1282C17.2192 16.3978 17.0555 16.6428 16.8491 16.8492C16.6427 17.0556 16.3977 17.2193 16.1281 17.331C15.8584 17.4427 15.5694 17.5002 15.2775 17.5002H8.05587C7.76401 17.5002 7.47501 17.4427 7.20536 17.331C6.93571 17.2193 6.69071 17.0556 6.48433 16.8492C6.27795 16.6428 6.11424 16.3978 6.00255 16.1282C5.89086 15.8585 5.83337 15.5695 5.83337 15.2777V8.056Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.34333 13.9475C3.0875 13.8021 2.87471 13.5916 2.72658 13.3374C2.57846 13.0832 2.50028 12.7942 2.5 12.5V4.16667C2.5 3.25 3.25 2.5 4.16667 2.5H12.5C13.125 2.5 13.465 2.82083 13.75 3.33333"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 hidden md:block">
          <h4 className="mb-2 text-base font-semibold text-white/80">
            Description
          </h4>
          <ScrollArea className="max-h-[150px] pr-4">
            <p className="text-sm text-white/60 space-y-2">{desc}</p>
            <p className="text-sm text-white/60 mt-2">{subDesc}</p>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
