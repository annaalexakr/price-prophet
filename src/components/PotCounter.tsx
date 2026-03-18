interface PotCounterProps {
  pot: number;
  entryCount: number;
}

export function PotCounter({ pot, entryCount }: PotCounterProps) {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4 flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Today's Pot</p>
        <p className="text-2xl font-bold mt-0.5 text-white">
          ${pot.toFixed(2)}
          <span className="text-gray-400 text-sm font-normal ml-1">USDT</span>
        </p>
      </div>
      <div className="text-right">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Players</p>
        <p className="text-2xl font-bold mt-0.5 text-white">{entryCount}</p>
      </div>
    </div>
  );
}
