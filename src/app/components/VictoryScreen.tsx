import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface VictoryScreenProps {
  elapsedTime: number;
  hintsUsed: number;
  totalAttempts: number;
  onPlayAgain: () => void;
}

export function VictoryScreen({ elapsedTime, hintsUsed, totalAttempts, onPlayAgain }: VictoryScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 8000);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-y-auto">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)',
      }} />

      {/* Binary confetti */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#00ff41] font-['Share_Tech_Mono'] text-sm"
              initial={{
                y: -20,
                x: Math.random() * window.innerWidth,
                rotate: 0,
                opacity: 0.8
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: 360,
                opacity: 0
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}
        </div>
      )}

      {/* Green particle burst */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-radial from-[#00ff41]/30 to-transparent pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-6">
        {/* ASCII Trophy */}
        <motion.pre
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[#00ff41] font-['Share_Tech_Mono'] text-xs leading-3 mb-8"
        >
{`       ___________
      '._==_==_=_.'
      .-\\:      /-.
     | (|:.     |) |
      '-|:.     |-'
        \\::.    /
         '::. .'
           ) (
         _.' '._
        \`"""""""\``}
        </motion.pre>

        {/* Main reveal box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="bg-[#111111] border-4 border-[#00ff41] shadow-[0_0_60px_rgba(0,255,65,0.6)] p-12 mb-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <pre className="font-['Share_Tech_Mono'] text-[#00ff41] text-center text-sm">
{`██████████████████████████████████
██  MASTER PASSWORD UNLOCKED:   ██
██                               ██
██       HACK-2026               ██
██                               ██
██  MISSION COMPLETE. AGENT.     ██
██████████████████████████████████`}
            </pre>
          </motion.div>
        </motion.div>

        {/* Stats card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="bg-[#111111] border-2 border-[#00d4ff] p-8 mb-8 w-full max-w-2xl"
        >
          <div className="font-['VT323'] text-[#00d4ff] text-2xl mb-6 text-center">
            MISSION STATISTICS
          </div>

          <div className="grid grid-cols-3 gap-6 font-['IBM_Plex_Mono']">
            <div className="text-center">
              <div className="text-[#808080] text-sm mb-2">TIME ELAPSED</div>
              <div className="text-[#00ff41] text-2xl">{formatTime(elapsedTime)}</div>
            </div>
            <div className="text-center">
              <div className="text-[#808080] text-sm mb-2">HINTS USED</div>
              <div className="text-[#00ff41] text-2xl">{hintsUsed}</div>
            </div>
            <div className="text-center">
              <div className="text-[#808080] text-sm mb-2">TOTAL ATTEMPTS</div>
              <div className="text-[#00ff41] text-2xl">{totalAttempts}</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#1a1a1a] text-center">
            <div className="text-[#808080] text-sm mb-2">ROOMS CLEARED</div>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((room) => (
                <motion.div
                  key={room}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 + room * 0.15 }}
                  className="w-10 h-10 rounded-full bg-[#00d4ff] shadow-[0_0_20px_#00d4ff] flex items-center justify-center font-['IBM_Plex_Mono'] text-[#0a0a0a] text-sm"
                >
                  {room}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
        >
          <button
            onClick={() => {
              const stats = `I escaped the Terminal Hacker room in ${formatTime(elapsedTime)}! Time: ${formatTime(elapsedTime)} | Attempts: ${totalAttempts} 🔓💻`;
              navigator.clipboard.writeText(stats);
              alert('Stats copied to clipboard!');
            }}
            className="flex-1 px-8 py-4 bg-[#0a0a0a] border-2 border-[#00d4ff] text-[#00d4ff] font-['IBM_Plex_Mono'] text-sm uppercase tracking-wider hover:bg-[#00d4ff] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] hover:scale-105"
          >
            📤 SHARE RESULT
          </button>
        </motion.div>

        {/* Warning message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="mt-6 bg-[#1a1a1a] border-l-4 border-[#ff6b35] p-4 w-full max-w-2xl"
        >
          <div className="font-['IBM_Plex_Mono'] text-[#ff6b35] text-xs text-center">
            ⚠️ SYSTEM NOW PERMANENTLY LOCKED
            <br />
            This escape room is a one-time experience
            <br />
            Contact administrator to reset the system
          </div>
        </motion.div>

        {/* Success message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-6 mb-8 font-['IBM_Plex_Mono'] text-[#808080] text-sm text-center"
        >
          SYSTEM STATUS: <span className="text-[#00d4ff]">BREACH SUCCESSFUL</span>
          <br />
          ALL SECURITY PROTOCOLS DISABLED
        </motion.div>
      </div>
    </div>
  );
}
