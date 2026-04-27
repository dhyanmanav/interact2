import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface BootScreenProps {
  onStart: () => void;
}

export function BootScreen({ onStart }: BootScreenProps) {
  const [bootText, setBootText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  const bootSequence = [
    'SYSTEM INITIALIZING...',
    'ESCAPE PROTOCOL v3.0 LOADED',
    '5 ROOMS DETECTED. SECURITY LEVEL: MAXIMUM',
    'CHALLENGE MODE: EXTREME',
    '> PRESS [ENTER] TO BEGIN INFILTRATION'
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let text = '';

    const typeWriter = setInterval(() => {
      if (currentLine < bootSequence.length) {
        if (currentChar < bootSequence[currentLine].length) {
          text += bootSequence[currentLine][currentChar];
          setBootText(text);
          currentChar++;
        } else {
          text += '\n';
          currentLine++;
          currentChar = 0;
          if (currentLine === bootSequence.length) {
            setTimeout(() => setShowButton(true), 500);
          }
        }
      } else {
        clearInterval(typeWriter);
      }
    }, 30);

    const blinkInterval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typeWriter);
      clearInterval(blinkInterval);
    };
  }, []);

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

      {/* Floating binary background */}
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

      {/* ASCII Art Skull */}
      <pre className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1a1a1a] font-['Share_Tech_Mono'] text-xs leading-3 select-none">
{`        _______________
       /               \\
      /   REST  IN      \\
     /     PEACE         \\
    /                     \\
    |  .-"""""-.          |
    | /         \\         |
    ||  O     O  |        |
    ||     ^     |        |
    ||   \\_____/ |        |
    | \\         /         |
    |  '-.....-'          |
    |_____________________|`}
      </pre>

      {/* Boot Terminal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl px-6">
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 shadow-[0_0_30px_rgba(0,255,65,0.15)]">
          <pre className="font-['Share_Tech_Mono'] text-[#00ff41] text-lg whitespace-pre-wrap">
            {bootText}
            {cursorBlink && <span className="inline-block w-2 h-5 bg-[#00ff41] ml-1 animate-pulse" />}
          </pre>

          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onStart}
              className="mt-8 px-8 py-4 bg-[#0a0a0a] border border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:scale-105"
            >
              [INITIATE BREACH]
            </motion.button>
          )}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#111111] border-t border-[#1a1a1a] px-6 py-3">
        <div className="font-['IBM_Plex_Mono'] text-xs text-[#808080]">
          ROOMS LOCKED: 5/5 | AGENT: UNKNOWN | TIME: 00:00:00 | DIFFICULTY: EXTREME
        </div>
        <div className="font-['IBM_Plex_Mono'] text-xs text-[#ff6b35] mt-1">
          ⚠️ WARNING: Leaving this page will lock the system permanently
        </div>
      </div>
    </div>
  );
}
