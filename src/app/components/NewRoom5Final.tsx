import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewRoom5FinalProps {
  onComplete: () => void;
  onAttempt: () => void;
}

export function NewRoom5Final({ onComplete, onAttempt }: NewRoom5FinalProps) {
  const [code, setCode] = useState(`function getPasswordClue() {
  // Fragments from all rooms
  let room1 = "HACK";
  let room2 = "CYBER";
  let room3 = 10;
  let room4 = "CODE";

  // Extract parts (BROKEN!)
  let wordPart = room1.slice(0, 2);
  let numberPart = room3 * 2;

  // Combine logic (WRONG!)
  let clue1 = wordPart + numberPart;
  let clue2 = room2.slice(0, 2);
  let clue3 = room4.length;

  // Final clue assembly (BROKEN!)
  let finalClue = clue1 + "-" + clue2 + "-" + clue3;

  // LOCKED: Cannot modify return
  return finalClue.toUpperCase();
}`);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const correctAnswer = 'HACK-2026';

  const handleRunCode = () => {
    // Prevent return modification
    if (!code.includes('return finalClue.toUpperCase()')) {
      setCodeOutput('BLOCKED: Return is locked!');
      return;
    }

    // Check for direct answer hardcoding
    if (code.includes('"HACK-2026"') || code.includes("'HACK-2026'") || code.includes('`HACK-2026`') ||
        code.includes('"HACK2026"') || code.includes("'HACK2026'") || code.includes('`HACK2026`')) {
      setCodeOutput('CHEATING DETECTED: Cannot hardcode the answer!');
      return;
    }

    // Check that required variables exist
    const mustInclude = ['room1', 'room2', 'room3', 'room4', 'wordPart', 'numberPart', 'finalClue'];
    const missing = mustInclude.filter(term => !code.includes(term));
    if (missing.length > 0) {
      setCodeOutput(`LOGIC ERROR: Missing required variables!`);
      return;
    }

    // Check that wordPart uses room1
    if (!code.includes('wordPart') || !/wordPart\s*=\s*room1/.test(code)) {
      setCodeOutput('LOGIC ERROR: wordPart must be derived from room1!');
      return;
    }

    // Check that numberPart uses room3
    if (!code.includes('numberPart') || !/numberPart\s*=\s*room3/.test(code)) {
      setCodeOutput('LOGIC ERROR: numberPart must be derived from room3!');
      return;
    }

    try {
      const func = new Function(`
        ${code}
        return getPasswordClue();
      `);
      const result = func();
      setCodeOutput(String(result));
    } catch (e) {
      setCodeOutput('ERROR: Syntax error in code');
    }
  };

  const handleSubmit = () => {
    onAttempt();
    if (finalAnswer.trim().toUpperCase() === correctAnswer) {
      setSuccess(true);
      setError('');
      setTimeout(() => {
        onComplete();
      }, 3000);
    } else {
      setError('FINAL LOCKDOWN - INCORRECT PASSWORD');
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
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#111111] border border-[#1a1a1a] p-6 shadow-[0_0_20px_rgba(0,255,65,0.1)] mb-8">
            <div className="font-['VT323'] text-[#00ff41] text-4xl mb-4 tracking-wider text-center">
              [ ROOM 05 / 05 ] — THE FINAL VAULT
            </div>

            <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm leading-relaxed text-center">
              The ultimate test. Fix ALL the bugs in the code, then solve the final puzzle.
              <br />
              <span className="text-[#ff6b35]">EXTREME: Fix code logic → Run it → Read output → Solve the puzzle</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Code Editor */}
            <div className="bg-[#111111] border-2 border-[#00ff41] p-6">
              <div className="font-['VT323'] text-[#00d4ff] text-2xl mb-4">MASTER CODE EDITOR</div>

              <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs mb-4">
                Fix the bugs to make the code output the correct clue.
                <br />
                <span className="text-[#ff6b35]">HINT: You want HACK as wordPart and 2026 as numberPart</span>
                <br />
                Then use the clue output to solve the final puzzle below.
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={success}
                className="w-full h-96 bg-[#0a0a0a] border border-[#00ff41] text-[#c8ffc8] font-['Fira_Code'] text-xs p-4 focus:outline-none focus:shadow-[0_0_20px_rgba(0,255,65,0.3)] resize-none caret-[#00ff41] mb-4"
                spellCheck={false}
              />

              <button
                onClick={handleRunCode}
                className="w-full px-6 py-3 bg-[#0a0a0a] border border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] mb-4"
              >
                [RUN CODE]
              </button>

              <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4">
                <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs mb-2">CODE OUTPUT:</div>
                <pre className={`font-['Fira_Code'] text-xl ${codeOutput === correctAnswer ? 'text-[#00d4ff]' : 'text-[#ff6b35]'}`}>
                  {codeOutput || 'Run code to see output...'}
                </pre>
              </div>
            </div>

            {/* Vault Panel */}
            <div className="bg-[#111111] border-2 border-[#00ff41] p-6">
              <div className="font-['VT323'] text-[#00d4ff] text-2xl mb-4">VAULT ACCESS</div>

              <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 mb-6">
                <div className="font-['VT323'] text-[#00ff41] text-xl mb-4 text-center">FINAL PUZZLE</div>

                <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs mb-4 text-center">
                  After fixing the code, run it and observe the output clue.
                  <br />
                  The clue shows the pattern: WORD-NUMBER-DIGIT
                  <br />
                  <span className="text-[#ff6b35]">The password is: WORD-NUMBER (remove the last digit)</span>
                </div>

                <div className="bg-[#1a1a1a] border-l-4 border-[#00d4ff] p-3 mb-4">
                  <div className="font-['IBM_Plex_Mono'] text-[#00d4ff] text-xs">
                    EXAMPLE: If clue is "HELLO-123-5"
                    <br />
                    Then password is "HELLO-123"
                  </div>
                </div>

                <input
                  type="text"
                  value={finalAnswer}
                  onChange={(e) => setFinalAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  disabled={success}
                  className={`w-full bg-[#0a0a0a] border-b-4 ${error ? 'border-[#ff3333] animate-[shake_0.3s]' : 'border-[#00ff41]'} text-[#00ff41] font-['Fira_Code'] text-2xl px-4 py-4 text-center focus:outline-none focus:shadow-[0_4px_30px_rgba(0,255,65,0.5)] caret-[#00ff41] uppercase tracking-widest mb-4`}
                  placeholder="PASSWORD"
                />

                <button
                  onClick={handleSubmit}
                  disabled={success}
                  className="w-full px-8 py-5 bg-[#0a0a0a] border-2 border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] text-xl uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,65,0.8)] hover:scale-105 disabled:opacity-50"
                >
                  {success ? '⚡ VAULT UNLOCKED ⚡' : '[UNLOCK VAULT]'}
                </button>
              </div>

              {error && (
                <div className="bg-[#1a1a1a] border-l-4 border-[#ff3333] p-4 text-[#ff3333] font-['IBM_Plex_Mono'] text-sm text-center animate-[shake_0.3s]">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Key Fragments */}
          <div className="bg-[#111111] border border-[#00d4ff] p-6">
            <div className="font-['VT323'] text-[#00d4ff] text-xl mb-4 text-center">
              KEY FRAGMENTS COLLECTED
            </div>
            <div className="grid grid-cols-4 gap-4">
              {['ALPHA', 'BETA', 'GAMMA', 'DELTA'].map((key, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-[#00d4ff] p-3 text-center">
                  <div className="font-['IBM_Plex_Mono'] text-[#00d4ff] text-xs">FRAGMENT {i + 1}</div>
                  <div className="font-['Share_Tech_Mono'] text-[#00ff41] text-sm">[{key}]</div>
                </div>
              ))}
            </div>
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
