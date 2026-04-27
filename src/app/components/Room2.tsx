import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Room2Props {
  onComplete: () => void;
  onAttempt: () => void;
}

export function Room2({ onComplete, onAttempt }: Room2Props) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [rotation, setRotation] = useState(0);

  const correctAnswer = '35';

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
      setError('DECRYPTION FAILED');
      setRotation(prev => prev + 45);
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

      <div className="h-full grid grid-cols-3 gap-6 p-6">
        {/* Col 1 - Puzzle */}
        <div className="flex flex-col">
          <div className="bg-[#111111] border border-[#1a1a1a] p-6 shadow-[0_0_20px_rgba(0,255,65,0.1)]">
            <div className="font-['VT323'] text-[#00ff41] text-2xl mb-4 tracking-wider">
              [ ROOM 02 / 03 ] — THE CIPHER VAULT
            </div>

            <div className="font-['IBM_Plex_Mono'] text-[#808080] text-sm mb-6 leading-relaxed">
              ENCRYPTED PAYLOAD INTERCEPTED: A mathematical cipher protects this vault.
              Decode the sequence to extract the result.
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4 mb-6 overflow-x-auto">
              <pre className="font-['Fira_Code'] text-sm whitespace-pre">
                <span className="text-[#ff6b35]"># What is the output?</span>{'\n'}
                <span className="text-[#c8ffc8]">secret</span> <span className="text-[#00ff41]">=</span> [<span className="text-[#ff6b35]">1</span>, <span className="text-[#ff6b35]">2</span>, <span className="text-[#ff6b35]">3</span>, <span className="text-[#ff6b35]">4</span>, <span className="text-[#ff6b35]">5</span>]{'\n'}
                <span className="text-[#c8ffc8]">result</span> <span className="text-[#00ff41]">=</span> <span className="text-[#00d4ff]">sum</span>([<span className="text-[#c8ffc8]">x</span><span className="text-[#00ff41]">**</span><span className="text-[#ff6b35]">2</span>{' '}
                <span className="text-[#00d4ff]">for</span> <span className="text-[#c8ffc8]">x</span> <span className="text-[#00d4ff]">in</span> <span className="text-[#c8ffc8]">secret</span>{' '}
                <span className="text-[#00d4ff]">if</span> <span className="text-[#c8ffc8]">x</span> <span className="text-[#00ff41]">%</span> <span className="text-[#ff6b35]">2</span> <span className="text-[#00ff41]">!=</span> <span className="text-[#ff6b35]">0</span>]){'\n'}
                <span className="text-[#00d4ff]">print</span>(<span className="text-[#c8ffc8]">result</span>)
              </pre>
            </div>

            <div className="mb-4">
              <label className="block font-['IBM_Plex_Mono'] text-[#00ff41] text-sm mb-2">
                &gt; DECRYPTION KEY:
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
              className="w-full px-6 py-3 bg-[#0a0a0a] border border-[#00ff41] text-[#00ff41] font-['IBM_Plex_Mono'] uppercase tracking-wider hover:bg-[#00ff41] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:scale-105 disabled:opacity-50"
              >
              {success ? 'VAULT OPENED' : '[DECRYPT]'}
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
              [!] {showHint ? 'HIDE' : 'REQUEST'} HINT
            </button>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 bg-[#1a1a1a] border-l-2 border-[#ff6b35] p-3 text-[#ff6b35] font-['IBM_Plex_Mono'] text-xs"
              >
                Filter odd numbers (x % 2 != 0): [1,3,5]. Square each: [1,9,25]. Sum them all.
              </motion.div>
            )}
          </div>
        </div>

        {/* Col 2 - Visual Feedback */}
        <div className="flex flex-col items-center justify-center bg-[#111111] border border-[#1a1a1a] p-6 relative">
          <div className="mb-8">
            <div className="font-['VT323'] text-[#00ff41] text-xl mb-2">PROGRESS</div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#00d4ff] shadow-[0_0_20px_#00d4ff] flex items-center justify-center font-['IBM_Plex_Mono'] text-[#0a0a0a]">
                  1
                </div>
                <div className="text-[#00d4ff] text-xs mt-1">CLEARED</div>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full ${success ? 'bg-[#00d4ff] shadow-[0_0_20px_#00d4ff]' : 'bg-[#1a1a1a] border border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.5)] animate-pulse'} flex items-center justify-center font-['IBM_Plex_Mono'] ${success ? 'text-[#0a0a0a]' : 'text-[#00ff41]'}`}>
                  2
                </div>
                <div className={`${success ? 'text-[#00d4ff]' : 'text-[#00ff41]'} text-xs mt-1`}>
                  {success ? 'CLEARED' : 'ACTIVE'}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#333333] flex items-center justify-center font-['IBM_Plex_Mono'] text-[#333333]">
                  3
                </div>
                <div className="text-[#333333] text-xs mt-1">LOCKED</div>
              </div>
            </div>
          </div>

          {/* Vault Door */}
          <motion.div
            animate={success ? { scaleY: 0.3, y: -50 } : {}}
            transition={{ duration: 1.2 }}
            className="w-64 h-80 bg-[#1a1a1a] border-4 border-[#00ff41] flex items-center justify-center relative overflow-hidden"
          >
            {success && (
              <>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-gradient-to-b from-[#00d4ff]/30 to-transparent"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center font-['Share_Tech_Mono'] text-[#00d4ff] text-2xl"
                >
                  KEY: [BETA]
                </motion.div>
              </>
            )}

            <div className="font-['VT323'] text-[#00ff41] text-3xl">
              {success ? '' : 'VAULT 02'}
            </div>
          </motion.div>
        </div>

        {/* Col 3 - Cipher Wheel */}
        <div className="flex flex-col items-center justify-center bg-[#111111] border border-[#1a1a1a] p-6">
          <div className="font-['VT323'] text-[#00ff41] text-xl mb-4">DECRYPTION TERMINAL</div>

          <motion.div
            animate={{ rotate: success ? 360 : rotation }}
            transition={{ duration: success ? 2 : 0.5, ease: success ? 'easeInOut' : 'easeOut' }}
            className="relative w-48 h-48"
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[#00ff41] shadow-[0_0_30px_rgba(0,255,65,0.3)]">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-[#00ff41] rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 30}deg) translateY(-90px) translateX(-50%)`,
                  }}
                />
              ))}
            </div>

            {/* Inner symbols */}
            <div className="absolute inset-8 rounded-full border-2 border-[#00d4ff] flex items-center justify-center">
              <div className="font-['Fira_Code'] text-[#00d4ff] text-4xl">
                {success ? '✓' : Math.floor(rotation / 45) % 10}
              </div>
            </div>
          </motion.div>

          <div className="mt-6 font-['IBM_Plex_Mono'] text-[#808080] text-xs text-center">
            {success ? 'CIPHER SOLVED' : 'ANALYZING PATTERN...'}
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
