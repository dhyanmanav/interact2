import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewRoom2Props {
  onComplete: () => void;
  onAttempt: () => void;
}

export function NewRoom2({ onComplete, onAttempt }: NewRoom2Props) {
  const [code, setCode] = useState(`function unlock(x) {
  let step1 = x + 5;
  let step2 = step1 - 10;
  let step3 = step2 * 3;
  let step4 = step3 / 2;
  let step5 = step4 + 7;

  // DO NOT EDIT BELOW THIS LINE
  return Math.floor(step5);
}`);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const targetOutput = '100';

  const handleRunCode = () => {
    onAttempt();

    // Check if they tried to edit the return statement
    if (!code.includes('return Math.floor(step5)')) {
      setError('SECURITY VIOLATION: Return statement cannot be modified!');
      setOutput('BLOCKED');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Check for direct assignment cheating (step5 = 100)
    if (/step5\s*=\s*100/.test(code) || /step5\s*=\s*["']100["']/.test(code)) {
      setError('CHEATING DETECTED: Cannot directly assign the answer to step5!');
      setOutput('BLOCKED');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Check that all steps are actually using previous variables
    const codeLines = code.split('\n');
    let hasStep1Calc = false, hasStep2Calc = false, hasStep3Calc = false, hasStep4Calc = false, hasStep5Calc = false;

    for (const line of codeLines) {
      if (line.includes('step1') && line.includes('=') && line.includes('x')) hasStep1Calc = true;
      if (line.includes('step2') && line.includes('=') && line.includes('step1')) hasStep2Calc = true;
      if (line.includes('step3') && line.includes('=') && line.includes('step2')) hasStep3Calc = true;
      if (line.includes('step4') && line.includes('=') && line.includes('step3')) hasStep4Calc = true;
      if (line.includes('step5') && line.includes('=') && line.includes('step4')) hasStep5Calc = true;
    }

    if (!hasStep1Calc || !hasStep2Calc || !hasStep3Calc || !hasStep4Calc || !hasStep5Calc) {
      setError('LOGIC ERROR: Each step must use the previous step in calculation!');
      setOutput('BLOCKED');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      // Execute the user's code
      const func = new Function(`
        ${code}
        return unlock(50);
      `);
      const result = func();
      setOutput(String(result));

      if (String(result) === targetOutput) {
        setSuccess(true);
        setError('');
        setTimeout(() => {
          onComplete();
        }, 2500);
      } else {
        setError(`WRONG OUTPUT: Got ${result}, Expected ${targetOutput}`);
        setTimeout(() => setError(''), 3000);
      }
    } catch (e) {
      setError('SYNTAX ERROR - CODE INVALID');
      setOutput('ERROR');
      setTimeout(() => setError(''), 3000);
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
              [ ROOM 02 / 05 ] — CODE REWRITE PROTOCOL
            </div>

            <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm mb-4 leading-relaxed text-center">
              The code below is broken. Edit it to make unlock(50) return exactly 100.
              <br />
              <span className="text-[#ff6b35]">YOU MUST MODIFY THE CODE. CHANGE THE LOGIC.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Code Editor */}
            <div className="bg-[#111111] border border-[#1a1a1a] p-4">
              <div className="font-['VT323'] text-[#00ff41] text-xl mb-3">CODE EDITOR</div>
              <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs mb-3">
                Fix the logic in steps 1-5. Make unlock(50) return exactly 100.
                <br />
                <span className="text-[#ff6b35]">WARNING: Cannot modify the return statement!</span>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={success}
                className="w-full h-80 bg-[#0a0a0a] border border-[#00ff41] text-[#c8ffc8] font-['Fira_Code'] text-xs p-4 focus:outline-none focus:shadow-[0_0_20px_rgba(0,255,65,0.3)] resize-none caret-[#00ff41]"
                spellCheck={false}
              />

              <div className="mt-3 font-['IBM_Plex_Mono'] text-[#ff6b35] text-xs">
                HINT: Trace through each step. Change operators (+, -, *, /) or numbers to get 100.
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-[#111111] border border-[#1a1a1a] p-4">
              <div className="font-['VT323'] text-[#00ff41] text-xl mb-3">EXECUTION PANEL</div>

              <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4 mb-4">
                <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs mb-2">FUNCTION CALL:</div>
                <pre className="font-['Fira_Code'] text-sm text-[#00d4ff]">
                  unlock(50)
                </pre>
              </div>

              <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4 mb-4">
                <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs mb-2">TARGET OUTPUT:</div>
                <pre className="font-['Fira_Code'] text-2xl text-[#00ff41]">
                  {targetOutput}
                </pre>
              </div>

              <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4 mb-4">
                <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs mb-2">YOUR OUTPUT:</div>
                <pre className={`font-['Fira_Code'] text-2xl ${output === targetOutput ? 'text-[#00d4ff]' : 'text-[#ff6b35]'}`}>
                  {output || '???'}
                </pre>
              </div>

              <button
                onClick={handleRunCode}
                disabled={success}
                className="w-full px-6 py-3 bg-[#0a0a0a] border border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:scale-105 disabled:opacity-50"
              >
                {success ? 'CODE ACCEPTED' : '[RUN CODE]'}
              </button>

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center font-['Share_Tech_Mono'] text-[#00d4ff] text-xl"
                >
                  ✓ PERFECT! KEY FRAGMENT: [BETA]
                </motion.div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-[#1a1a1a] border-l-4 border-[#ff3333] p-4 text-[#ff3333] font-['IBM_Plex_Mono'] text-sm text-center animate-[shake_0.3s]">
              {error}
            </div>
          )}
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
