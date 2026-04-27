import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewRoom4Props {
  onComplete: () => void;
  onAttempt: () => void;
}

export function NewRoom4({ onComplete, onAttempt }: NewRoom4Props) {
  const [code, setCode] = useState(`function calculate(a, b) {
  let temp1 = a - b;
  let temp2 = temp1 + b;
  let temp3 = temp2 / 2;
  let temp4 = temp3 * 2;
  let temp5 = temp4 - 50;

  // LOCKED: DO NOT MODIFY
  return temp5;
}`);
  const [output, setOutput] = useState('');
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [codeSolved, setCodeSolved] = useState(false);
  const [riddleSolved, setRiddleSolved] = useState(false);

  const targetOutput = '150';
  const correctRiddle = 'CODE';

  const checkCode = () => {
    // Prevent direct return modification
    if (!code.includes('return temp5')) {
      setOutput('BLOCKED');
      setError('SECURITY: Return statement is locked!');
      setTimeout(() => setError(''), 2000);
      return false;
    }

    // Prevent direct answer assignment
    if (/temp5\s*=\s*150/.test(code) || /temp5\s*=\s*["']150["']/.test(code)) {
      setOutput('BLOCKED');
      setError('CHEATING: Cannot directly assign answer to temp5!');
      setTimeout(() => setError(''), 2000);
      return false;
    }

    // Check that each temp uses previous
    const codeLines = code.split('\n');
    let hasTemp1 = false, hasTemp2 = false, hasTemp3 = false, hasTemp4 = false, hasTemp5 = false;

    for (const line of codeLines) {
      if (line.includes('temp1') && line.includes('=') && (line.includes('a') || line.includes('b'))) hasTemp1 = true;
      if (line.includes('temp2') && line.includes('=') && line.includes('temp1')) hasTemp2 = true;
      if (line.includes('temp3') && line.includes('=') && line.includes('temp2')) hasTemp3 = true;
      if (line.includes('temp4') && line.includes('=') && line.includes('temp3')) hasTemp4 = true;
      if (line.includes('temp5') && line.includes('=') && line.includes('temp4')) hasTemp5 = true;
    }

    if (!hasTemp1 || !hasTemp2 || !hasTemp3 || !hasTemp4 || !hasTemp5) {
      setOutput('BLOCKED');
      setError('LOGIC ERROR: Each temp must use previous temp!');
      setTimeout(() => setError(''), 2000);
      return false;
    }

    try {
      const func = new Function(`
        ${code}
        return calculate(100, 50);
      `);
      const result = func();
      setOutput(String(result));

      if (String(result) === targetOutput) {
        setCodeSolved(true);
        return true;
      }
      return false;
    } catch (e) {
      setOutput('ERROR');
      return false;
    }
  };

  const checkRiddle = () => {
    if (riddleAnswer.trim().toUpperCase() === correctRiddle) {
      setRiddleSolved(true);
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    onAttempt();

    const codeOk = codeSolved || checkCode();
    const riddleOk = riddleSolved || checkRiddle();

    if (codeOk && riddleOk) {
      setSuccess(true);
      setError('');
      setTimeout(() => {
        onComplete();
      }, 2500);
    } else {
      setError('INCOMPLETE - SOLVE BOTH CHALLENGES');
      setTimeout(() => setError(''), 2000);
    }
  };

  const allSolved = codeSolved && riddleSolved;

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
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#111111] border border-[#1a1a1a] p-6 shadow-[0_0_20px_rgba(0,255,65,0.1)] mb-6">
            <div className="font-['VT323'] text-[#00ff41] text-3xl mb-3 tracking-wider text-center">
              [ ROOM 04 / 05 ] — DUAL CHALLENGE
            </div>

            <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm mb-2 leading-relaxed text-center">
              Two locks. Two puzzles. Both must be solved to proceed.
              <br />
              <span className="text-[#ff6b35]">MAXIMUM DIFFICULTY. NO MERCY.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Puzzle 1: Code Editor */}
            <motion.div
              animate={codeSolved ? { scale: 1.02 } : {}}
              className={`bg-[#111111] border-2 ${codeSolved ? 'border-[#00d4ff] shadow-[0_0_30px_rgba(0,212,255,0.5)]' : 'border-[#1a1a1a]'} p-4`}
            >
              <div className="font-['VT323'] text-[#00ff41] text-xl mb-3">CHALLENGE A: FIX THE CODE</div>

              <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs mb-3">
                Fix the logic steps. Return statement is LOCKED.
                <br />
                calculate(100, 50) must return 150.
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={codeSolved}
                className="w-full h-56 bg-[#0a0a0a] border border-[#00ff41] text-[#c8ffc8] font-['Fira_Code'] text-xs p-3 focus:outline-none resize-none caret-[#00ff41] mb-2"
                spellCheck={false}
              />

              <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-2 mb-2">
                <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs">OUTPUT: <span className={output === targetOutput ? 'text-[#00d4ff]' : 'text-[#ff6b35]'}>{output || '???'}</span></div>
                <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs">TARGET: <span className="text-[#00ff41]">{targetOutput}</span></div>
              </div>

              <button
                onClick={() => {
                  checkCode();
                }}
                disabled={codeSolved}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] text-xs uppercase hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all disabled:opacity-50"
              >
                {codeSolved ? '✓ SOLVED' : 'TEST CODE'}
              </button>
            </motion.div>

            {/* Puzzle 2: Riddle */}
            <motion.div
              animate={riddleSolved ? { scale: 1.02 } : {}}
              className={`bg-[#111111] border-2 ${riddleSolved ? 'border-[#00d4ff] shadow-[0_0_30px_rgba(0,212,255,0.5)]' : 'border-[#1a1a1a]'} p-4`}
            >
              <div className="font-['VT323'] text-[#00ff41] text-xl mb-3">CHALLENGE B: THE RIDDLE</div>

              <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs mb-4">
                Solve this riddle:
              </div>

              <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4 mb-4">
                <pre className="font-['Share_Tech_Mono'] text-[#00d4ff] text-sm leading-relaxed">
{`I'm written by humans,
but executed by machines.

I have syntax and logic,
bugs hide in between.

Developers write me,
compilers read me.

What am I?`}
                </pre>
              </div>

              <input
                type="text"
                value={riddleAnswer}
                onChange={(e) => {
                  setRiddleAnswer(e.target.value);
                  if (e.target.value.trim().toUpperCase() === correctRiddle) {
                    setRiddleSolved(true);
                  }
                }}
                disabled={riddleSolved}
                className={`w-full bg-[#0a0a0a] border-b-2 ${riddleSolved ? 'border-[#00d4ff]' : 'border-[#00ff41]'} text-[#00ff41] font-['Fira_Code'] px-2 py-2 text-sm focus:outline-none uppercase text-center`}
                placeholder="YOUR ANSWER"
              />

              {riddleSolved && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-[#00d4ff] font-['IBM_Plex_Mono'] text-xs text-center"
                >
                  ✓ CHALLENGE B COMPLETE
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Combined Solution */}
          <AnimatePresence>
            {allSolved && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111111] border-2 border-[#00ff41] p-6 mb-6 shadow-[0_0_40px_rgba(0,255,65,0.3)]"
              >
                <div className="text-center">
                  <div className="font-['VT323'] text-[#00d4ff] text-2xl mb-3">
                    BOTH CHALLENGES SOLVED
                  </div>
                  <div className="font-['Share_Tech_Mono'] text-[#00ff41] text-lg">
                    ACCESS GRANTED TO FINAL ROOM
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-[#111111] border border-[#1a1a1a] p-6">
            <button
              onClick={handleSubmit}
              disabled={success}
              className="w-full px-6 py-3 bg-[#0a0a0a] border border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:scale-105 disabled:opacity-50"
            >
              {success ? 'BOTH LOCKS OPENED' : '[VERIFY SOLUTIONS]'}
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
                KEY FRAGMENT: [DELTA]
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
