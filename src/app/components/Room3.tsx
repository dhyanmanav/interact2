import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Room3Props {
  onComplete: () => void;
  onAttempt: () => void;
}

export function Room3({ onComplete, onAttempt }: Room3Props) {
  const [fragmentA, setFragmentA] = useState('');
  const [fragmentB, setFragmentB] = useState('');
  const [fragmentC, setFragmentC] = useState('');
  const [finalAnswer, setFinalAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [solvedA, setSolvedA] = useState(false);
  const [solvedB, setSolvedB] = useState(false);
  const [solvedC, setSolvedC] = useState(false);

  const checkFragment = (fragment: 'A' | 'B' | 'C', value: string) => {
    const answers = { A: 'inter', B: 'act', C: '2026' };
    if (value.trim().toLowerCase() === answers[fragment].toLowerCase()) {
      if (fragment === 'A') setSolvedA(true);
      if (fragment === 'B') setSolvedB(true);
      if (fragment === 'C') setSolvedC(true);
      return true;
    }
    return false;
  };

  const handleFinalSubmit = () => {
    onAttempt();
    if (finalAnswer.trim().toLowerCase() === 'interact2026') {
      setSuccess(true);
      setError('');
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      setError('ACCESS DENIED - INCORRECT WORD');
      setTimeout(() => setError(''), 2000);
    }
  };

  const allFragmentsSolved = solvedA && solvedB && solvedC;

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] pt-16 overflow-hidden">
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

      <div className="h-full overflow-y-auto p-6 pt-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="font-['VT323'] text-[#00ff41] text-3xl mb-2 tracking-wider">
              [ ROOM 03 / 03 ] — THE FINAL LOCK
            </div>
            <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm">
              THREE FRAGMENTS. ONE SECRET WORD. COMBINE THEM TO UNLOCK THE VAULT.
            </div>
          </div>

          {/* Three fragment panels in a grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Fragment A */}
            <motion.div
              animate={solvedA ? { scale: 1.02 } : {}}
              className={`bg-[#111111] border-2 ${solvedA ? 'border-[#00d4ff] shadow-[0_0_30px_rgba(0,212,255,0.5)]' : 'border-[#1a1a1a]'} p-4`}
            >
              <div className="font-['VT323'] text-[#00ff41] text-lg mb-2">FRAGMENT A</div>
              <pre className="font-['Fira_Code'] text-xs mb-3 text-[#c8ffc8]">
{`const code =
"interaction";
code.slice(0, 5);
// output: ?`}
              </pre>
              <input
                type="text"
                value={fragmentA}
                onChange={(e) => {
                  setFragmentA(e.target.value);
                  checkFragment('A', e.target.value);
                }}
                disabled={solvedA}
                className={`w-full bg-[#0a0a0a] border-b-2 ${solvedA ? 'border-[#00d4ff]' : 'border-[#00ff41]'} text-[#00ff41] font-['Fira_Code'] px-2 py-1 text-xs focus:outline-none`}
                placeholder="output"
              />
              {solvedA && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-[#00d4ff] font-['IBM_Plex_Mono'] text-xs"
                >
                  ✓ DECODED
                </motion.div>
              )}
            </motion.div>

            {/* Fragment B */}
            <motion.div
              animate={solvedB ? { scale: 1.02 } : {}}
              className={`bg-[#111111] border-2 ${solvedB ? 'border-[#00d4ff] shadow-[0_0_30px_rgba(0,212,255,0.5)]' : 'border-[#1a1a1a]'} p-4`}
            >
              <div className="font-['VT323'] text-[#00ff41] text-lg mb-2">FRAGMENT B</div>
              <pre className="font-['Fira_Code'] text-xs mb-3 text-[#c8ffc8]">
{`def decode():
  word = "react"
  return word[2:5]
print(decode())
# output: ?`}
              </pre>
              <input
                type="text"
                value={fragmentB}
                onChange={(e) => {
                  setFragmentB(e.target.value);
                  checkFragment('B', e.target.value);
                }}
                disabled={solvedB}
                className={`w-full bg-[#0a0a0a] border-b-2 ${solvedB ? 'border-[#00d4ff]' : 'border-[#00ff41]'} text-[#00ff41] font-['Fira_Code'] px-2 py-1 text-xs focus:outline-none`}
                placeholder="output"
              />
              {solvedB && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-[#00d4ff] font-['IBM_Plex_Mono'] text-xs"
                >
                  ✓ DECODED
                </motion.div>
              )}
            </motion.div>

            {/* Fragment C */}
            <motion.div
              animate={solvedC ? { scale: 1.02 } : {}}
              className={`bg-[#111111] border-2 ${solvedC ? 'border-[#00d4ff] shadow-[0_0_30px_rgba(0,212,255,0.5)]' : 'border-[#1a1a1a]'} p-4`}
            >
              <div className="font-['VT323'] text-[#00ff41] text-lg mb-2">FRAGMENT C</div>
              <pre className="font-['Fira_Code'] text-xs mb-3 text-[#c8ffc8]">
{`year = 2025;
result = year + 1;
console.log(result);
// output: ?`}
              </pre>
              <input
                type="text"
                value={fragmentC}
                onChange={(e) => {
                  setFragmentC(e.target.value);
                  checkFragment('C', e.target.value);
                }}
                disabled={solvedC}
                className={`w-full bg-[#0a0a0a] border-b-2 ${solvedC ? 'border-[#00d4ff]' : 'border-[#00ff41]'} text-[#00ff41] font-['Fira_Code'] px-2 py-1 text-xs focus:outline-none`}
                placeholder="output"
              />
              {solvedC && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-[#00d4ff] font-['IBM_Plex_Mono'] text-xs"
                >
                  ✓ DECODED
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Center combination display */}
          <div className="flex justify-center mb-8">
            <div className="w-64 h-32 rounded-lg border-4 border-[#00ff41] flex items-center justify-center bg-[#0a0a0a] shadow-[0_0_40px_rgba(0,255,65,0.3)]">
              {allFragmentsSolved ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-['Share_Tech_Mono'] text-[#00d4ff] text-lg text-center"
                >
                  {fragmentA} + {fragmentB} + {fragmentC}
                </motion.div>
              ) : (
                <div className="font-['VT323'] text-[#808080] text-3xl">???</div>
              )}
            </div>
          </div>

          {/* Final Input */}
          <AnimatePresence>
            {allFragmentsSolved && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto bg-[#111111] border-2 border-[#00ff41] p-6 shadow-[0_0_40px_rgba(0,255,65,0.3)]"
              >
                <div className="font-['VT323'] text-[#00ff41] text-xl mb-3 text-center">
                  ENTER THE SECRET WORD
                </div>

                <input
                  type="text"
                  value={finalAnswer}
                  onChange={(e) => setFinalAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFinalSubmit()}
                  disabled={success}
                  className={`w-full bg-[#0a0a0a] border-b-4 ${error ? 'border-[#ff3333] animate-[shake_0.3s]' : 'border-[#00ff41]'} text-[#00ff41] font-['Fira_Code'] text-xl px-4 py-2 text-center focus:outline-none focus:shadow-[0_4px_20px_rgba(0,255,65,0.5)] caret-[#00ff41]`}
                  placeholder="combine fragments..."
                />

                <button
                  onClick={handleFinalSubmit}
                  disabled={success}
                  className="w-full mt-4 px-6 py-3 bg-[#0a0a0a] border-2 border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] text-lg uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,65,0.7)] hover:scale-105 disabled:opacity-50"
                >
                  {success ? 'VAULT UNLOCKED' : '[UNLOCK VAULT]'}
                </button>

                {error && (
                  <div className="mt-4 text-[#ff3333] font-['IBM_Plex_Mono'] text-center animate-[shake_0.3s]">
                    {error}
                  </div>
                )}

                <button
                  onClick={() => setShowHint(!showHint)}
                  className="mt-4 w-full text-[#ff6b35] font-['IBM_Plex_Mono'] text-xs hover:text-[#ff8855] transition-colors"
                >
                  [!] {showHint ? 'HIDE' : 'NEED A'} HINT?
                </button>

                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 bg-[#1a1a1a] border-l-2 border-[#ff6b35] p-2 text-[#ff6b35] font-['IBM_Plex_Mono'] text-xs text-center"
                  >
                    Concatenate all three fragments together as one word, no spaces or symbols.
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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
