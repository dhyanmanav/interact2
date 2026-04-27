import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Room1Props {
  onComplete: () => void;
  onAttempt: () => void;
}

export function Room1({ onComplete, onAttempt }: Room1Props) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [attemptLog, setAttemptLog] = useState<string[]>([]);

  const correctAnswer = '1001';

  const handleSubmit = () => {
    onAttempt();
    const trimmedAnswer = answer.trim();

    if (trimmedAnswer === correctAnswer) {
      setSuccess(true);
      setError('');
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setError('INCORRECT - SECURITY ALERT');
      setAttemptLog(prev => [...prev, `FAILED: "${trimmedAnswer}"`].slice(-5));
      setTimeout(() => setError(''), 2000);
    }
  };

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
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#00d4ff] pointer-events-none z-20"
          />
        )}
      </AnimatePresence>

      <div className="h-full grid grid-cols-2 gap-6 p-6">
        {/* Left Panel - Puzzle */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#111111] border border-[#1a1a1a] p-6 shadow-[0_0_20px_rgba(0,255,65,0.1)]">
            <div className="font-['VT323'] text-[#00ff41] text-2xl mb-4 tracking-wider">
              [ ROOM 01 / 03 ] — THE ENTRY GATE
            </div>

            <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm mb-6 leading-relaxed">
              INTERCEPTED TRANSMISSION: A malformed function has been detected in the security subsystem.
              Your task: trace the execution and determine the output.
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4 mb-6">
              <pre className="font-['Fira_Code'] text-sm">
                <span className="text-[#ff6b35]">// Fix this function — what does it return?</span>{'\n'}
                <span className="text-[#00d4ff]">function</span> <span className="text-[#c8ffc8]">decode</span>(<span className="text-[#c8ffc8]">x</span>) {'{\n'}
                {'  '}<span className="text-[#00d4ff]">return</span> <span className="text-[#c8ffc8]">x</span> <span className="text-[#00ff41]">*</span> <span className="text-[#ff6b35]">2</span> <span className="text-[#00ff41]">+</span> <span className="text-[#ff6b35]">"01"</span>;{'\n'}
                {'}\n'}
                <span className="text-[#c8ffc8]">console</span>.<span className="text-[#c8ffc8]">log</span>(<span className="text-[#c8ffc8]">decode</span>(<span className="text-[#ff6b35]">5</span>)); <span className="text-[#ff6b35]">// ???</span>
              </pre>
            </div>

            <div className="mb-4">
              <label className="block font-['IBM_Plex_Mono'] text-[#00ff41] text-sm mb-2">
                &gt; ENTER KEY:
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className={`w-full bg-[#0a0a0a] border-b-2 ${error ? 'border-[#ff3333] animate-[shake_0.3s]' : 'border-[#00ff41]'} text-[#00ff41] font-['Fira_Code'] px-3 py-2 focus:outline-none focus:shadow-[0_2px_10px_rgba(0,255,65,0.3)] transition-shadow caret-[#00ff41]`}
                disabled={success}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={success}
              className="w-full px-6 py-3 bg-[#0a0a0a] border border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[#0a0a0a] disabled:hover:text-[#00ff41]"
            >
              {success ? 'ACCESS GRANTED' : '[SUBMIT]'}
            </button>

            {error && (
              <div className="mt-4 text-[#ff3333] font-['IBM_Plex_Mono'] text-sm animate-[shake_0.3s]">
                {error}
              </div>
            )}

            <button
              onClick={() => setShowHint(!showHint)}
              className="mt-6 text-[#ff6b35] font-['IBM_Plex_Mono'] text-sm hover:text-[#ff8855] transition-colors"
            >
              [!] {showHint ? 'HIDE' : 'REQUEST'} HINT — costs 30 seconds
            </button>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 bg-[#1a1a1a] border-l-2 border-[#ff6b35] p-3 text-[#ff6b35] font-['IBM_Plex_Mono'] text-xs"
              >
                When you add a string to a number in JavaScript, the number is converted to a string.
                Think about string concatenation: 5 * 2 = 10, then 10 + "01" = ?
              </motion.div>
            )}
          </div>

          {/* Agent Log */}
          {attemptLog.length > 0 && (
            <div className="bg-[#111111] border border-[#1a1a1a] p-4 flex-1 overflow-auto">
              <div className="font-['IBM_Plex_Mono'] text-[#808080] text-xs mb-2">AGENT LOG:</div>
              {attemptLog.map((log, i) => (
                <div key={i} className="font-['Fira_Code'] text-[#ff3333] text-xs">
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel - Door Visual */}
        <div className="flex flex-col items-center justify-center bg-[#111111] border border-[#1a1a1a] p-6 relative overflow-hidden">
          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 bg-gradient-radial from-[#00d4ff]/20 to-transparent"
            />
          )}

          {/* Door */}
          <motion.div
            animate={success ? { scaleX: 0.8 } : {}}
            transition={{ duration: 1 }}
            className="relative w-64 h-96 bg-[#1a1a1a] border-4 border-[#00ff41] flex items-center justify-center"
          >
            {success && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent"
              />
            )}

            <div className="text-center">
              <div className="font-['VT323'] text-[#00ff41] text-4xl mb-2">
                {success ? 'UNLOCKED' : 'LOCKED'}
              </div>
              <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm">
                SECURITY: {success ? 'BREACHED' : 'MAXIMUM'}
              </div>
            </div>
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 font-['Share_Tech_Mono'] text-[#00d4ff] text-xl"
            >
              KEY: [ALPHA]
            </motion.div>
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
