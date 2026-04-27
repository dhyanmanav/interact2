import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewRoom3Props {
  onComplete: () => void;
  onAttempt: () => void;
}

export function NewRoom3({ onComplete, onAttempt }: NewRoom3Props) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const correctAnswer = '10';

  const handleSubmit = () => {
    onAttempt();
    const trimmedAnswer = answer.trim();

    if (trimmedAnswer === correctAnswer) {
      setSuccess(true);
      setError('');
      setTimeout(() => {
        onComplete();
      }, 2500);
    } else {
      setError('ACCESS DENIED - INCORRECT OUTPUT');
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
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#00d4ff] pointer-events-none z-20"
          />
        )}
      </AnimatePresence>

      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#111111] border border-[#1a1a1a] p-6 shadow-[0_0_20px_rgba(0,255,65,0.1)] mb-6">
            <div className="font-['VT323'] text-[#00ff41] text-3xl mb-3 tracking-wider text-center">
              [ ROOM 03 / 05 ] — THE LOGIC MAZE
            </div>

            <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm mb-4 leading-relaxed text-center">
              Trace the code execution mentally. What does mystery(7) return?
              <br />
              <span className="text-[#ff6b35]">NO RUNNING CODE. PURE LOGIC. THINK STEP BY STEP.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* Main Code Block */}
            <div className="bg-[#111111] border-2 border-[#00ff41] p-6">
              <div className="font-['VT323'] text-[#00d4ff] text-2xl mb-4 text-center">TRACE THIS CODE</div>
              <pre className="font-['Fira_Code'] text-sm text-[#c8ffc8] leading-relaxed bg-[#0a0a0a] p-6 border border-[#1a1a1a]">
{`function mystery(n) {
  let result = 0;
  let current = n;

  while (current > 0) {
    if (current % 2 === 0) {
      result = result + 2;
    } else {
      result = result + 1;
    }
    current = current - 1;
  }

  return result;
}

// What does mystery(7) return?`}
              </pre>

              <div className="mt-6 bg-[#1a1a1a] border-l-4 border-[#ff6b35] p-4">
                <div className="font-['VT323'] text-[#ff6b35] text-lg mb-2">ANALYSIS GUIDE</div>
                <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs leading-relaxed">
                  • Loop starts with current = 7
                  <br />
                  • Each iteration: check if current is even/odd
                  <br />
                  • If odd: add 1 to result, if even: add 2 to result
                  <br />
                  • Decrease current by 1
                  <br />
                  • Repeat until current = 0
                  <br />
                  • Trace: 7(odd)→6(even)→5(odd)→4(even)→3(odd)→2(even)→1(odd)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#1a1a1a] p-6">
            <div className="mb-4">
              <label className="block font-['IBM_Plex_Mono'] text-[#00ff41] text-sm mb-2 text-center">
                &gt; WHAT DOES mystery(7) RETURN?
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className={`w-full bg-[#0a0a0a] border-b-2 ${error ? 'border-[#ff3333] animate-[shake_0.3s]' : 'border-[#00ff41]'} text-[#00ff41] font-['Fira_Code'] text-2xl px-3 py-3 text-center focus:outline-none focus:shadow-[0_2px_10px_rgba(0,255,65,0.3)] transition-shadow caret-[#00ff41]`}
                disabled={success}
                placeholder="???"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={success}
              className="w-full px-6 py-3 bg-[#0a0a0a] border border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:scale-105 disabled:opacity-50"
            >
              {success ? 'LOGIC SOLVED' : '[SUBMIT ANSWER]'}
            </button>

            {error && (
              <div className="mt-4 text-[#ff3333] font-['IBM_Plex_Mono'] text-sm text-center animate-[shake_0.3s]">
                {error}
              </div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center font-['Share_Tech_Mono'] text-[#00d4ff] text-xl"
              >
                KEY FRAGMENT: [GAMMA]
              </motion.div>
            )}
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
