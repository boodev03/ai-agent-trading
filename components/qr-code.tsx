"use client";

interface QRCodeProps {
  size?: number;
  logo?: string;
}

export default function QRCode({ size = 320, logo }: QRCodeProps) {
  return (
    <div className="relative w-full h-full">
      <img
        src="https://img.abyssale.com/574bfa75-c880-46be-97ae-599473818958"
        alt="QR Code"
        className="w-full h-full object-contain rounded-xl"
      />
      {logo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-1 rounded-xl">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
