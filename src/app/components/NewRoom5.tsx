import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewRoom5Props {
  onComplete: () => void;
  onAttempt: () => void;
}

export function NewRoom5({ onComplete, onAttempt }: NewRoom5Props) {
  const [finalAnswer, setFinalAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const correctAnswer = 'ESCAPE2026';

  const handleSubmit = () => {
    onAttempt();
    if (finalAnswer.trim().toUpperCase() === correctAnswer) {
      setSuccess(true);
      setError('');
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      setError('FINAL LOCKDOWN - INCORRECT SECRET');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] pt-16 overflow-y-auto">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)',
      }} />

      {/* Flash overlays */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#ff3333] pointer-events-none z-20"
          />
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#00d4ff] pointer-events-none z-20"
          />
        )}
      </AnimatePresence>

      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#111111] border border-[#1a1a1a] p-6 shadow-[0_0_20px_rgba(0,255,65,0.1)] mb-8">
            <div className="font-['VT323'] text-[#00ff41] text-4xl mb-4 tracking-wider text-center">
              [ ROOM 05 / 05 ] — THE FINAL VAULT
            </div>

            <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm leading-relaxed text-center">
              The last challenge. Decode the final message and enter the master password.
              <br />
              <span className="text-[#ff6b35]">THIS IS IT. EVERYTHING YOU'VE LEARNED COMES TOGETHER.</span>
            </div>
          </div>

          {/* The Final Puzzle */}
          <div className="bg-[#111111] border-2 border-[#00ff41] p-8 mb-8 shadow-[0_0_40px_rgba(0,255,65,0.2)]">
            <div className="font-['VT323'] text-[#00d4ff] text-2xl mb-6 text-center">
              ENCRYPTED VAULT PASSWORD
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Clue 1 */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4">
                <div className="font-['VT323'] text-[#00ff41] text-lg mb-3">CLUE #1: BINARY WORD</div>
                <pre className="font-['Fira_Code'] text-xs text-[#00d4ff] leading-relaxed">
                  01000101 01010011 01000011
                  01000001 01010000 01000101
                </pre>
                <div className="mt-3 font-['IBM_Plex_Mono'] text-[#808080] text-xs">
                  Decode this binary message.
                  <br />
                  This is the FIRST part of the password.
                </div>
              </div>

              {/* Clue 2 */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4">
                <div className="font-['VT323'] text-[#00ff41] text-lg mb-3">CLUE #2: THE NUMBER</div>
                <pre className="font-['Fira_Code'] text-xs text-[#c8ffc8] leading-relaxed">
{`const year = 2025;
const next = year + 1;
console.log(next);
// Output: ?`}
                </pre>
                <div className="mt-3 font-['IBM_Plex_Mono'] text-[#808080] text-xs">
                  Execute this code mentally.
                  <br />
                  This is the SECOND part of the password.
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border-l-4 border-[#ff6b35] p-4 mb-6">
              <div className="font-['VT323'] text-[#ff6b35] text-xl mb-2">FINAL INSTRUCTION</div>
              <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm">
                Combine CLUE #1 and CLUE #2 with NO SPACES.
                <br />
                Format: WORD + NUMBER
                <br />
                Example: If word is "HELLO" and number is "123", answer is "HELLO123"
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-['IBM_Plex_Mono'] text-[#00ff41] text-lg mb-3 text-center">
                &gt; ENTER MASTER PASSWORD:
              </label>
              <input
                type="text"
                value={finalAnswer}
                onChange={(e) => setFinalAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                disabled={success}
                className={`w-full bg-[#0a0a0a] border-b-4 ${error ? 'border-[#ff3333] animate-[shake_0.3s]' : 'border-[#00ff41]'} text-[#00ff41] font-['Fira_Code'] text-3xl px-4 py-4 text-center focus:outline-none focus:shadow-[0_4px_30px_rgba(0,255,65,0.5)] caret-[#00ff41] uppercase tracking-widest`}
                placeholder="XXXXXXXXXX"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={success}
              className="w-full px-8 py-5 bg-[#0a0a0a] border-2 border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] text-2xl uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,65,0.8)] hover:scale-105 disabled:opacity-50"
            >
              {success ? '⚡ VAULT UNLOCKED ⚡' : '[UNLOCK FINAL VAULT]'}
            </button>

            {error && (
              <div className="mt-6 text-[#ff3333] font-['IBM_Plex_Mono'] text-lg text-center animate-[shake_0.3s]">
                {error}
              </div>
            )}
          </div>

          {/* Key Fragment Display */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {['ALPHA', 'BETA', 'GAMMA', 'DELTA'].map((key, i) => (
              <div key={i} className="bg-[#111111] border border-[#00d4ff] p-3 text-center">
                <div className="font-['IBM_Plex_Mono'] text-[#00d4ff] text-xs">KEY {i + 1}</div>
                <div className="font-['Share_Tech_Mono'] text-[#00ff41] text-sm">[{key}]</div>
              </div>
            ))}
          </div>

          <div className="text-center font-['IBM_Plex_Mono'] text-[#808080] text-xs">
            ALL KEY FRAGMENTS COLLECTED • FINAL VAULT READY FOR BREACH
          </div>
        </div>
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
