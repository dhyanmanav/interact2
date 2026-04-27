import { useEffect, useState } from 'react';

interface HUDProps {
  currentRoom: number;
  totalRooms: number;
  startTime: number;
  attempts: number;
}

export function HUD({ currentRoom, totalRooms, startTime, attempts }: HUDProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const roomsLocked = totalRooms - currentRoom;
  const timeColor = elapsed > 120 ? (elapsed > 180 ? 'text-[#ff3333]' : 'text-[#ff6b35]') : 'text-[#00ff41]';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 border-b border-[#1a1a1a] backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3 font-['IBM_Plex_Mono'] text-sm">
        <div className="flex items-center gap-6">
          <div className="text-[#808080]">
            ROOMS LOCKED: <span className="text-[#ff6b35]">{roomsLocked}/{totalRooms}</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(totalRooms)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < currentRoom ? 'bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]' : 'bg-[#1a1a1a] border border-[#333333]'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-[#808080]">
            AGENT: <span className="text-[#00ff41]">UNKNOWN</span>
          </div>
          <div className={`${timeColor}`}>
            TIME: {formatTime(elapsed)}
          </div>
          <div className="text-[#808080]">
            ATTEMPTS: <span className="text-[#00ff41]">{attempts}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
