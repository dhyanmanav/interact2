CONCEPT & THEME
Design a dark, immersive "terminal hacker" coding escape room web app. Think: underground cyberpunk bunker meets retro terminal aesthetics. Green phosphor glow on black, scanlines, glitch effects, typewriter text. The user is a "hacker" solving code puzzles to unlock secret rooms. The final reward reveals the word interact2026.

VISUAL IDENTITY

Color Palette:

Background: #0a0a0a (near black)
Primary Glow: #00ff41 (matrix green)
Accent 1: #ff6b35 (warning orange — for hints/errors)
Accent 2: #00d4ff (cyan — for unlocked/success states)
Surface: #111111 with 1px solid #1a1a1a borders
Text: #c8ffc8 (soft green on dark)


Typography:

Display/Headers: "Share Tech Mono" or "VT323" (Google Fonts — retro terminal feel)
Code blocks: "Fira Code" with ligatures enabled
UI Labels: "IBM Plex Mono" — sharp, technical


Texture & Atmosphere:

Subtle CRT scanline overlay (repeating horizontal lines at 2px gap, 3% opacity)
Noise grain texture on all panels
Glowing green cursor blink on active inputs
Outer glow (box-shadow: 0 0 20px #00ff4133) on active panels
Background: animated floating binary/hex characters drifting slowly (like Matrix rain, very subtle, 5% opacity)




APP STRUCTURE — 5 SCREENS

SCREEN 1 — BOOT / LANDING

Full screen dark terminal with a boot sequence animation:

  SYSTEM INITIALIZING...
  ESCAPE PROTOCOL v2.0 LOADED
  3 ROOMS DETECTED. SECURITY LEVEL: MAXIMUM
  > PRESS [ENTER] TO BEGIN INFILTRATION_

Typewriter animation for the boot text
One large glowing [INITIATE BREACH] button — green border, black fill, glow pulse
Subtle skull + lock icon in ASCII art in the background
Small bottom status bar: "ROOMS LOCKED: 3/3 | AGENT: UNKNOWN | TIME: 00:00:00"


SCREEN 2 — ROOM 1: "THE ENTRY GATE"
Layout: Split screen — LEFT = puzzle panel, RIGHT = code editor
Left Panel — Puzzle Brief:

Terminal-style header: [ ROOM 01 / 03 ] — THE ENTRY GATE
"Intercepted transmission" flavor text in monospace
The puzzle: A broken JavaScript function with a bug to fix

js  // Fix this function — what does it return?
  function decode(x) {
    return x * 2 + "01";
  }
  console.log(decode(5)); // ???

Answer input field: > ENTER KEY: ________
[SUBMIT] button with glow state
Hint toggle (collapsed): [!] REQUEST HINT — costs 30 seconds

Right Panel — Visual:

Animated door graphic (ASCII or SVG) — thick vault door, locked state
Progress bar at top: ROOM 1 ● ○ ○
Live countdown timer: TIME ELAPSED: 00:02:14
Small "AGENT LOG" feed showing past attempts

Success State:

Door cracks open with green light flooding through
Screen flash + glitch animation
ACCESS GRANTED — KEY: [ALPHA] animates in
Transition button: [ PROCEED TO ROOM 02 → ]

Failure State:

Red screen flash, INCORRECT — SECURITY ALERT in red
Input shakes (CSS keyframe shake)
Attempt counter decrements: ATTEMPTS REMAINING: 2


SCREEN 3 — ROOM 2: "THE CIPHER VAULT"
Harder puzzle — Python/logic based:
Layout: Full-width terminal with 3 columns:

Col 1: Puzzle + flavor narrative
Col 2: Code snippet + editable answer field
Col 3: "DECRYPTION TERMINAL" — visual animated cipher wheel rotating slowly

The Puzzle:
python# What is the output?
secret = [1, 2, 3, 4, 5]
result = sum([x**2 for x in secret if x % 2 != 0])
print(result)
UI elements:

Cipher wheel SVG spinning slowly in Col 3
Door graphic now shows ROOM 2 — partially cracked from Room 1
Answer field with blinking cursor
ROOMS CLEARED mini badge animates in from Room 1 win


SCREEN 4 — ROOM 3: "THE FINAL LOCK"
Most complex — multi-step logic puzzle:
Layout: Full dark screen, center-focused puzzle box with dramatic framing
The puzzle involves three code fragments, each yielding a word:
Fragment A → outputs: "inter"  
Fragment B → outputs: "act"  
Fragment C → outputs: "2026"
User must combine them: inter + act + 2026 = interact2026
Visual Design:

Three glowing panels arranged in a triangle
Each panel "activates" (pulses cyan) when its answer is correct
When all three activate: the center void fills with the combined key
Final input: > ENTER THE SECRET WORD: ________
Giant vault door behind it — ornate, mechanical, SVG


SCREEN 5 — VICTORY / DEBRIEF

Explosive green particle burst animation
ASCII art trophy / agent badge
Big reveal:

  ██████████████████████████████████
  ██  SECRET WORD UNLOCKED:        ██
  ██                               ██
  ██     interact2026              ██
  ██                               ██
  ██  MISSION COMPLETE. AGENT.     ██
  ██████████████████████████████████

Stats card: Time taken, Hints used, Rooms cleared
[PLAY AGAIN] and [SHARE RESULT] buttons
Confetti made of binary 0s and 1s floating up


GLOBAL COMPONENTS
ComponentSpecTop HUD barAlways visible — Room progress dots, timer, attempts remainingCode blockDark panel, Fira Code font, syntax highlighting (green strings, cyan keywords, orange numbers)Answer inputFull-width monospace input, green bottom border only, blinking cursor, glow on focusPrimary ButtonBlack fill, 1px green border, uppercase monospace label, box-shadow green glow on hover, slight scale-upAlert/ErrorRed #ff3333 flash overlay, shake animation on inputSuccess flashCyan overlay, 0.3s fade in-out, door open animationHint panelCollapsed accordion, orange accent, -30s time penalty warning

RESPONSIVENESS

Desktop (1280px+): Split-panel layouts, full atmospheric effects
Tablet (768–1279px): Stack panels vertically, preserve all animations
Mobile (< 768px): Single column, larger tap targets, simplified background effects, sticky HUD bar at bottom like a game controller strip


MICRO-INTERACTIONS CHECKLIST

 Button hover: green glow pulse + 2px lift
 Input focus: border glow, blinking cursor activates
 Wrong answer: red flash + shake + error sound (optional)
 Correct answer: door crack animation + particle burst
 Room transition: full-screen glitch wipe left-to-right
 Timer: turns orange at 2 min remaining, red at 1 min
 Typewriter effect on all narrative text reveals