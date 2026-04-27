import { useState } from 'react';
import { motion } from 'motion/react';

interface LockScreenProps {
  onUnlock: () => void;
  isCompleted: boolean;
}

export function LockScreen({ onUnlock, isCompleted }: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cursorBlink, setCursorBlink] = useState(true);

  const ENTRY_PASSWORD = '123456';
  const ADMIN_PASSWORD = 'interact2026';

  const handleSubmit = () => {
    if (isCompleted) {
      // If completed, only admin password works
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('escaperoom_completed', 'false');
        localStorage.setItem('escaperoom_locked', 'false');
        onUnlock();
      } else {
        setError('ADMIN ACCESS DENIED - INCORRECT PASSWORD');
        setTimeout(() => setError(''), 2000);
      }
    } else {
      // First time, use entry password
      if (password === ENTRY_PASSWORD) {
        onUnlock();
      } else {
        setError('ACCESS DENIED - INCORRECT PASSWORD');
        setTimeout(() => setError(''), 2000);
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)',
      }} />

      {/* Noise */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
      }} />

      {/* Floating binary */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00ff41] font-['Share_Tech_Mono'] text-xs"
            initial={{ y: -20, x: Math.random() * window.innerWidth }}
            animate={{ y: window.innerHeight + 20 }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.div>
        ))}
      </div>

      {/* Lock Screen */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111111] border-2 border-[#00ff41] p-8 shadow-[0_0_40px_rgba(0,255,65,0.3)]"
        >
          {/* Lock Icon */}
          <div className="text-center mb-8">
            <pre className="font-['Share_Tech_Mono'] text-[#00ff41] text-xs leading-3 inline-block">
{`    ___________
   |  ___      |
   | |   |     |
   | |   |     |
   | |___|     |
   |           |
   |   [●]     |
   |___________|`}
            </pre>
          </div>

          <div className="font-['VT323'] text-[#00ff41] text-4xl mb-4 tracking-wider text-center">
            {isCompleted ? 'SYSTEM LOCKED' : 'SECURITY CHECKPOINT'}
          </div>

          {isCompleted ? (
            <>
              <div className="font-['IBM_Plex_Mono'] text-[#ff3333] text-sm mb-6 text-center leading-relaxed">
                ESCAPE ROOM COMPLETED
                <br />
                SYSTEM PERMANENTLY LOCKED
                <br />
                <span className="text-[#808080]">Contact administrator to reset</span>
              </div>

              <div className="bg-[#1a1a1a] border-l-4 border-[#ff6b35] p-4 mb-6">
                <div className="font-['IBM_Plex_Mono'] text-[#ff6b35] text-xs">
                  ⚠️ ADMIN PASSWORD REQUIRED
                  <br />
                  Only the administrator can unlock this system
                </div>
              </div>
            </>
          ) : (
            <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm mb-6 text-center leading-relaxed">
              ENTER ACCESS CODE TO BEGIN
              <br />
              AUTHORIZED PERSONNEL ONLY
            </div>
          )}

          <div className="mb-6">
            <label className="block font-['IBM_Plex_Mono'] text-[#00ff41] text-sm mb-2">
              &gt; PASSWORD:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className={`w-full bg-[#0a0a0a] border-b-2 ${error ? 'border-[#ff3333] animate-[shake_0.3s]' : 'border-[#00ff41]'} text-[#00ff41] font-['Fira_Code'] px-3 py-3 text-xl focus:outline-none focus:shadow-[0_2px_10px_rgba(0,255,65,0.3)] transition-shadow caret-[#00ff41] tracking-widest`}
              placeholder="••••••"
              autoFocus
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full px-8 py-4 bg-[#0a0a0a] border-2 border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,65,0.7)] hover:scale-105"
          >
            {isCompleted ? '[ADMIN UNLOCK]' : '[UNLOCK]'}
          </button>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-[#ff3333] font-['IBM_Plex_Mono'] text-sm text-center animate-[shake_0.3s]"
            >
              {error}
            </motion.div>
          )}

          {!isCompleted && (
            <div className="mt-6 text-center font-['IBM_Plex_Mono'] text-[#808080] text-xs">
              NO UNAUTHORIZED ACCESS • SECURITY MONITORED
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
