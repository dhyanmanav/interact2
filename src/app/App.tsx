import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LockScreen } from './components/LockScreen';
import { BootScreen } from './components/BootScreen';
import { NewRoom1 } from './components/NewRoom1';
import { NewRoom2 } from './components/NewRoom2';
import { NewRoom3 } from './components/NewRoom3';
import { NewRoom4 } from './components/NewRoom4';
import { NewRoom5Final } from './components/NewRoom5Final';
import { VictoryScreen } from './components/VictoryScreen';
import { HUD } from './components/HUD';

type Screen = 'lock' | 'boot' | 'room1' | 'room2' | 'room3' | 'room4' | 'room5' | 'victory';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('lock');
  const [startTime, setStartTime] = useState(Date.now());
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const completed = localStorage.getItem('escaperoom_completed') === 'true';
    const locked = localStorage.getItem('escaperoom_locked') !== 'false';

    setIsCompleted(completed);
    setIsLocked(locked);

    if (!locked && !completed) {
      // Already unlocked and not completed, can continue
      setCurrentScreen('lock');
    }
  }, []);

  // Lock on page unload/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isCompleted) {
        localStorage.setItem('escaperoom_locked', 'true');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isCompleted]);

  const transitionToScreen = (screen: Screen) => {
    setShowGlitch(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setShowGlitch(false);
    }, 400);
  };

  const handleUnlock = () => {
    setIsLocked(false);
    localStorage.setItem('escaperoom_locked', 'false');
    transitionToScreen('boot');
  };

  const handleStart = () => {
    setStartTime(Date.now());
    setTotalAttempts(0);
    setHintsUsed(0);
    transitionToScreen('room1');
  };

  const handleRoom1Complete = () => {
    transitionToScreen('room2');
  };

  const handleRoom2Complete = () => {
    transitionToScreen('room3');
  };

  const handleRoom3Complete = () => {
    transitionToScreen('room4');
  };

  const handleRoom4Complete = () => {
    transitionToScreen('room5');
  };

  const handleRoom5Complete = () => {
    handleVictory();
  };

  const handleVictory = () => {
    // Mark as completed and lock permanently
    localStorage.setItem('escaperoom_completed', 'true');
    localStorage.setItem('escaperoom_locked', 'true');
    setIsCompleted(true);
    setIsLocked(true);
    transitionToScreen('victory');
  };

  const handlePlayAgain = () => {
    // Can't play again if completed - redirect to lock screen
    if (isCompleted) {
      transitionToScreen('lock');
    } else {
      setStartTime(Date.now());
      setTotalAttempts(0);
      setHintsUsed(0);
      transitionToScreen('boot');
    }
  };

  const handleAttempt = () => {
    setTotalAttempts(prev => prev + 1);
  };

  const getRoomNumber = (): number => {
    switch (currentScreen) {
      case 'room1': return 1;
      case 'room2': return 2;
      case 'room3': return 3;
      case 'room4': return 4;
      case 'room5': return 5;
      case 'victory': return 5;
      default: return 0;
    }
  };

  const showHUD = currentScreen !== 'lock' && currentScreen !== 'boot' && currentScreen !== 'victory';

  return (
    <div className="relative size-full bg-[#0a0a0a] overflow-hidden">
      {/* Glitch transition overlay */}
      <AnimatePresence>
        {showGlitch && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            exit={{ x: '200%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {/* Multiple glitch layers */}
            <div className="absolute inset-0 bg-[#00ff41] opacity-30" />
            <div className="absolute inset-0 bg-[#00d4ff] opacity-20" style={{ clipPath: 'polygon(0 20%, 100% 20%, 100% 40%, 0 40%)' }} />
            <div className="absolute inset-0 bg-[#ff6b35] opacity-20" style={{ clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)' }} />

            {/* Scanline effect */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD */}
      {showHUD && (
        <HUD
          currentRoom={getRoomNumber()}
          totalRooms={5}
          startTime={startTime}
          attempts={totalAttempts}
        />
      )}

      {/* Screen rendering */}
      <AnimatePresence mode="wait">
        {currentScreen === 'lock' && (
          <motion.div
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LockScreen onUnlock={handleUnlock} isCompleted={isCompleted} />
          </motion.div>
        )}

        {currentScreen === 'boot' && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BootScreen onStart={handleStart} />
          </motion.div>
        )}

        {currentScreen === 'room1' && (
          <motion.div
            key="room1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NewRoom1 onComplete={handleRoom1Complete} onAttempt={handleAttempt} />
          </motion.div>
        )}

        {currentScreen === 'room2' && (
          <motion.div
            key="room2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NewRoom2 onComplete={handleRoom2Complete} onAttempt={handleAttempt} />
          </motion.div>
        )}

        {currentScreen === 'room3' && (
          <motion.div
            key="room3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NewRoom3 onComplete={handleRoom3Complete} onAttempt={handleAttempt} />
          </motion.div>
        )}

        {currentScreen === 'room4' && (
          <motion.div
            key="room4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NewRoom4 onComplete={handleRoom4Complete} onAttempt={handleAttempt} />
          </motion.div>
        )}

        {currentScreen === 'room5' && (
          <motion.div
            key="room5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NewRoom5Final onComplete={handleRoom5Complete} onAttempt={handleAttempt} />
          </motion.div>
        )}

        {currentScreen === 'victory' && (
          <motion.div
            key="victory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VictoryScreen
              elapsedTime={Math.floor((Date.now() - startTime) / 1000)}
              hintsUsed={hintsUsed}
              totalAttempts={totalAttempts}
              onPlayAgain={handlePlayAgain}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
