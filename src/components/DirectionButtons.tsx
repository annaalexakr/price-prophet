"use client";

export type Direction = "UP" | "DOWN" | null;

interface DirectionButtonsProps {
  selected: Direction;
  onSelect: (dir: "UP" | "DOWN") => void;
}

export function DirectionButtons({ selected, onSelect }: DirectionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => onSelect("UP")}
        className={`py-5 rounded-2xl font-bold text-lg transition-all flex flex-col items-center gap-1 ${
          selected === "UP"
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-[1.02]"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        <span className="text-3xl">↑</span>
        <span>Higher</span>
        <span className="text-xs font-normal opacity-70">at midnight UTC</span>
      </button>

      <button
        onClick={() => onSelect("DOWN")}
        className={`py-5 rounded-2xl font-bold text-lg transition-all flex flex-col items-center gap-1 ${
          selected === "DOWN"
            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-[1.02]"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        <span className="text-3xl">↓</span>
        <span>Lower</span>
        <span className="text-xs font-normal opacity-70">at midnight UTC</span>
      </button>
    </div>
  );
}
