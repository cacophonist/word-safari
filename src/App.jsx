import React, { useState, useEffect } from 'react';

// --- DATA DICTIONARY ---
const wordBank = [
  { word: "BIRD", emoji: "🐦" },
  { word: "FROG", emoji: "🐸" },
  { word: "LION", emoji: "🦁" },
  { word: "BEAR", emoji: "🐻" },
  { word: "FISH", emoji: "🐟" },
  { word: "DUCK", emoji: "🦆" },
  { word: "STAR", emoji: "⭐" },
  { word: "MOON", emoji: "🌙" },
  { word: "TREE", emoji: "🌳" },
  { word: "FIRE", emoji: "🔥" },
  { word: "BOAT", emoji: "⛵" },
  { word: "KITE", emoji: "🪁" },
  { word: "BALL", emoji: "⚽" },
  { word: "CAKE", emoji: "🍰" },
  { word: "CRAB", emoji: "🦀" },
  { word: "LEAF", emoji: "🍃" },
  { word: "SNOW", emoji: "❄️" },
  { word: "RAIN", emoji: "🌧️" },
  { word: "WOLF", emoji: "🐺" },
  { word: "GOAT", emoji: "🐐" },
  { word: "SWAN", emoji: "🦢" },
  { word: "DOVE", emoji: "🕊️" },
  { word: "MICE", emoji: "🐁" },
  { word: "BULL", emoji: "🐂" },
  { word: "ANTS", emoji: "🐜" },
  { word: "BATS", emoji: "🦇" },
  { word: "DEER", emoji: "🦌" },
  { word: "SEAL", emoji: "🦭" },
  { word: "PONY", emoji: "🐎" },
  { word: "HARE", emoji: "🐇" },
  { word: "HOME", emoji: "🏠" },
  { word: "DOOR", emoji: "🚪" },
  { word: "BATH", emoji: "🛁" },
  { word: "SOAP", emoji: "🧼" },
  { word: "BOOK", emoji: "📖" },
  { word: "DESK", emoji: "🪑" },
  { word: "TOYS", emoji: "🧸" },
  { word: "DOLL", emoji: "🪆" },
  { word: "BIKE", emoji: "🚲" },
  { word: "SHIP", emoji: "🚢" },
  { word: "STOP", emoji: "🛑" },
  { word: "TENT", emoji: "⛺" },
  { word: "CAMP", emoji: "🏕️" },
  { word: "PARK", emoji: "🏞️" },
  { word: "SAND", emoji: "🏖️" },
  { word: "ROCK", emoji: "🪨" },
  { word: "WIND", emoji: "💨" },
  { word: "MILK", emoji: "🥛" },
  { word: "MEAT", emoji: "🥩" },
  { word: "RICE", emoji: "🍚" },
  { word: "CORN", emoji: "🌽" },
  { word: "PEAR", emoji: "🍐" },
  { word: "PLUM", emoji: "🍑" },
  { word: "KIWI", emoji: "🥝" },
  { word: "TACO", emoji: "🌮" },
  { word: "SOUP", emoji: "🥣" },
  { word: "FORK", emoji: "🍴" },
  { word: "BOWL", emoji: "🍜" },
  { word: "BABY", emoji: "👶" },
  { word: "FACE", emoji: "👦" },
  { word: "EYES", emoji: "👀" },
  { word: "NOSE", emoji: "👃" },
  { word: "HAND", emoji: "🖐️" },
  { word: "FOOT", emoji: "🦶" },
  { word: "BONE", emoji: "🦴" },
  { word: "RING", emoji: "💍" },
  { word: "SHOE", emoji: "👞" },
  { word: "BELL", emoji: "🔔" }
];

// Helper to get random items
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('menu'); // 'menu', 'scramble', 'missing', 'match', 'math'
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }

  const showFeedback = (type, message, callback) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
      if (callback) callback();
    }, 1500);
  };

  const handleWin = () => {
    setScore(s => s + 10);
    showFeedback('success', 'Great Job! +10 Points 🌟');
  };

  const handleLose = () => {
    showFeedback('error', 'Oops! Try Again 🤔');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-300 font-sans text-gray-800 flex flex-col items-center py-6 px-4">
      {/* Custom Family Header */}
      <div className="w-full max-w-2xl text-center mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-purple-800 drop-shadow-md tracking-wide">
          ✨ Tanya & Kabir play to learn ✨
        </h2>
      </div>

      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8 bg-white p-4 rounded-3xl shadow-lg border-b-4 border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
          Word Safari 🐾
        </h1>
        <div className="flex items-center gap-4">
          <div className="bg-yellow-300 px-4 py-2 rounded-2xl font-bold text-yellow-900 border-b-4 border-yellow-500 flex items-center gap-2 text-lg sm:text-xl">
            <span>⭐</span> {score}
          </div>
          {view !== 'menu' && (
            <button 
              onClick={() => setView('menu')}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-2xl font-bold text-gray-700 border-b-4 border-gray-400 active:border-b-0 active:translate-y-1 transition-all"
            >
              Menu
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-2xl flex-1 flex flex-col relative">
        {view === 'menu' && <MainMenu setView={setView} />}
        {view === 'scramble' && <GameScramble onWin={handleWin} onLose={handleLose} feedback={feedback} />}
        {view === 'missing' && <GameMissingLetter onWin={handleWin} onLose={handleLose} feedback={feedback} />}
        {view === 'match' && <GameWordMatch onWin={handleWin} onLose={handleLose} feedback={feedback} />}
        {view === 'math' && <GameNumberTable onWin={handleWin} onLose={handleLose} feedback={feedback} />}

        {/* Global Feedback Overlay */}
        {feedback && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className={`
              px-8 py-6 rounded-3xl shadow-2xl text-3xl sm:text-4xl font-extrabold text-white text-center transform transition-all
              ${feedback.type === 'success' ? 'bg-green-500 animate-bounce' : 'bg-red-500 animate-pulse'}
            `}>
              {feedback.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- GAME MENU ---
function MainMenu({ setView }) {
  const games = [
    { id: 'scramble', title: 'Word Scramble', desc: 'Put the letters in order!', icon: '🔀', color: 'from-pink-400 to-rose-500', shadow: 'border-rose-600' },
    { id: 'missing', title: 'Missing Letter', desc: 'Find the hidden letter!', icon: '🔍', color: 'from-blue-400 to-cyan-500', shadow: 'border-cyan-600' },
    { id: 'match', title: 'Word Match', desc: 'Match word to picture!', icon: '✨', color: 'from-green-400 to-emerald-500', shadow: 'border-emerald-600' },
    { id: 'math', title: 'Number Table Time', desc: 'Strawberry Math!', icon: '🍓', color: 'from-orange-400 to-red-500', shadow: 'border-red-600' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full mt-4">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-purple-900 drop-shadow-md">Choose a Game!</h2>
      </div>
      {games.map(game => (
        <button
          key={game.id}
          onClick={() => setView(game.id)}
          className={`
            w-full bg-gradient-to-r ${game.color} text-white p-6 rounded-3xl shadow-lg
            border-b-8 ${game.shadow} active:border-b-0 active:translate-y-2
            flex items-center gap-6 transition-all hover:brightness-110
          `}
        >
          <div className="text-5xl sm:text-6xl bg-white bg-opacity-30 p-4 rounded-2xl">
            {game.icon}
          </div>
          <div className="text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-1">{game.title}</h3>
            <p className="text-lg font-medium opacity-90">{game.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

// --- GAME 1: WORD SCRAMBLE ---
function GameScramble({ onWin, onLose, feedback }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [sourceLetters, setSourceLetters] = useState([]);
  const [targetSlots, setTargetSlots] = useState([null, null, null, null]);

  const initGame = () => {
    let newWord;
    do { newWord = getRandomItem(wordBank); } while (currentWord && newWord.word === currentWord.word);
    
    setCurrentWord(newWord);
    
    let letters = newWord.word.split('');
    let scrambled = shuffleArray(letters);
    while (scrambled.join('') === newWord.word) {
      scrambled = shuffleArray(letters);
    }
    
    setSourceLetters(scrambled.map((char, index) => ({ id: index, char, used: false })));
    setTargetSlots([null, null, null, null]);
  };

  useEffect(() => { initGame(); }, []);

  useEffect(() => {
    if (targetSlots.every(slot => slot !== null)) {
      const spelledWord = targetSlots.map(slot => slot.char).join('');
      if (spelledWord === currentWord.word) {
        onWin();
        setTimeout(initGame, 1500); 
      } else {
        onLose();
        setTimeout(() => {
          setSourceLetters(prev => prev.map(l => ({...l, used: false})));
          setTargetSlots([null, null, null, null]);
        }, 1000);
      }
    }
  }, [targetSlots]);

  const handleSourceClick = (letter) => {
    if (letter.used || feedback) return;
    const firstEmptyIndex = targetSlots.findIndex(slot => slot === null);
    if (firstEmptyIndex !== -1) {
      const newSlots = [...targetSlots];
      newSlots[firstEmptyIndex] = letter;
      setTargetSlots(newSlots);
      
      const newSource = [...sourceLetters];
      newSource[newSource.findIndex(l => l.id === letter.id)].used = true;
      setSourceLetters(newSource);
    }
  };

  const handleTargetClick = (slot, index) => {
    if (!slot || feedback) return;
    const newSlots = [...targetSlots];
    newSlots[index] = null;
    setTargetSlots(newSlots);

    const newSource = [...sourceLetters];
    newSource[newSource.findIndex(l => l.id === slot.id)].used = false;
    setSourceLetters(newSource);
  };

  if (!currentWord) return null;

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl w-full flex flex-col items-center">
      <div className="text-8xl mb-8 animate-bounce">{currentWord.emoji}</div>
      <div className="flex gap-3 sm:gap-6 mb-12">
        {targetSlots.map((slot, i) => (
          <div 
            key={i}
            onClick={() => handleTargetClick(slot, i)}
            className={`
              w-16 h-20 sm:w-20 sm:h-24 rounded-2xl flex items-center justify-center text-4xl font-bold cursor-pointer
              ${slot ? 'bg-blue-400 text-white border-b-8 border-blue-600 shadow-md' : 'bg-gray-100 border-4 border-dashed border-gray-300'}
              transition-all
            `}
          >
            {slot ? slot.char : ''}
          </div>
        ))}
      </div>
      <div className="flex gap-3 sm:gap-6">
        {sourceLetters.map((letter) => (
          <button
            key={letter.id}
            onClick={() => handleSourceClick(letter)}
            className={`
              w-16 h-20 sm:w-20 sm:h-24 rounded-2xl flex items-center justify-center text-4xl font-bold
              transition-all duration-200
              ${letter.used ? 'bg-gray-200 text-transparent border-gray-200 opacity-50 cursor-default scale-95' : 'bg-pink-400 text-white border-b-8 border-pink-600 hover:bg-pink-500 active:border-b-0 active:translate-y-2 cursor-pointer shadow-lg'}
            `}
          >
            {letter.char}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- GAME 2: MISSING LETTER ---
function GameMissingLetter({ onWin, onLose, feedback }) {
  const [currentData, setCurrentData] = useState(null);

  const initGame = () => {
    let wordObj = getRandomItem(wordBank);
    const missingIdx = Math.floor(Math.random() * 4);
    const correctLetter = wordObj.word[missingIdx];
    
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let wrongLetters = alphabet.filter(l => l !== correctLetter);
    wrongLetters = shuffleArray(wrongLetters).slice(0, 3);
    
    const options = shuffleArray([correctLetter, ...wrongLetters]);
    
    setCurrentData({ ...wordObj, missingIdx, correctLetter, options });
  };

  useEffect(() => { initGame(); }, []);

  const handleOptionClick = (letter) => {
    if (feedback) return;
    if (letter === currentData.correctLetter) {
      onWin();
      setTimeout(initGame, 1500);
    } else {
      onLose();
    }
  };

  if (!currentData) return null;

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl w-full flex flex-col items-center">
      <div className="text-8xl mb-8 bg-blue-100 p-6 rounded-full shadow-inner">{currentData.emoji}</div>
      <div className="flex gap-3 sm:gap-6 mb-12">
        {currentData.word.split('').map((char, i) => (
          <div 
            key={i}
            className={`
              w-16 h-20 sm:w-20 sm:h-24 rounded-2xl flex items-center justify-center text-5xl font-extrabold
              ${i === currentData.missingIdx ? 'bg-gray-100 border-b-8 border-gray-300 text-transparent border-dashed' : 'bg-green-400 text-white border-b-8 border-green-600 shadow-md'}
            `}
          >
            {i === currentData.missingIdx ? '_' : char}
          </div>
        ))}
      </div>
      <div className="flex gap-4 sm:gap-6 w-full justify-center flex-wrap">
        {currentData.options.map((letter, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(letter)}
            className="w-16 h-20 sm:w-20 sm:h-24 bg-purple-400 hover:bg-purple-500 text-white border-b-8 border-purple-600 active:border-b-0 active:translate-y-2 rounded-2xl text-4xl font-bold shadow-lg transition-all"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- GAME 3: WORD MATCH ---
function GameWordMatch({ onWin, onLose, feedback }) {
  const [currentData, setCurrentData] = useState(null);

  const initGame = () => {
    let correctWordObj = getRandomItem(wordBank);
    let otherWords = wordBank.filter(w => w.word !== correctWordObj.word);
    let wrongWords = shuffleArray(otherWords).slice(0, 2);
    const options = shuffleArray([correctWordObj, ...wrongWords]);
    setCurrentData({ correct: correctWordObj, options: options });
  };

  useEffect(() => { initGame(); }, []);

  const handleOptionClick = (selectedWord) => {
    if (feedback) return;
    if (selectedWord === currentData.correct.word) {
      onWin();
      setTimeout(initGame, 1500);
    } else {
      onLose();
    }
  };

  if (!currentData) return null;

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl w-full flex flex-col items-center">
      <div className="bg-yellow-100 w-48 h-48 rounded-full flex items-center justify-center text-9xl mb-12 shadow-inner border-4 border-yellow-200">
        {currentData.correct.emoji}
      </div>
      <div className="flex flex-col gap-4 w-full sm:w-3/4">
        {currentData.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(opt.word)}
            className="w-full py-4 sm:py-6 bg-cyan-400 hover:bg-cyan-500 text-white border-b-8 border-cyan-600 active:border-b-0 active:translate-y-2 rounded-3xl text-3xl sm:text-4xl font-extrabold shadow-lg transition-all tracking-widest"
          >
            {opt.word}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- GAME 4: NUMBER TABLE TIME ---
function GameNumberTable({ onWin, onLose, feedback }) {
  const [data, setData] = useState(null);
  const [inputVal, setInputVal] = useState("");

  const initGame = () => {
    const x = Math.floor(Math.random() * 11); // Random 0 to 10
    const y = Math.floor(Math.random() * 11); // Random 0 to 10
    const z = x * y;
    
    const blanks = ['x', 'y', 'z'];
    const blank = blanks[Math.floor(Math.random() * blanks.length)];
    
    const signs = ['X', 'times', 'multiplied by'];
    const sign = signs[Math.floor(Math.random() * signs.length)];

    setData({ x, y, z, blank, sign });
    setInputVal("");
  };

  useEffect(() => { initGame(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback) return;
    if (inputVal.trim() === "") return;
    
    let correctValue;
    if (data.blank === 'x') correctValue = data.x;
    else if (data.blank === 'y') correctValue = data.y;
    else correctValue = data.z;

    if (parseInt(inputVal) === correctValue) {
      onWin();
      setTimeout(initGame, 1500);
    } else {
      onLose();
      setInputVal("");
    }
  };

  if (!data) return null;

  const renderInputField = () => (
    <input
      type="number"
      value={inputVal}
      onChange={(e) => setInputVal(e.target.value)}
      className="w-20 h-20 sm:w-24 sm:h-24 text-center text-4xl sm:text-5xl font-bold bg-white text-blue-700 border-b-8 border-gray-300 rounded-2xl focus:outline-none focus:border-orange-500 mx-2 shadow-inner"
      autoFocus
      placeholder="?"
    />
  );

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl w-full flex flex-col items-center">
      
      {/* Equation Area */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-3xl sm:text-5xl font-extrabold text-gray-700 mb-8">
          {data.blank === 'x' ? renderInputField() : <span className="px-2">{data.x}</span>}
          
          <span className="text-orange-500 text-2xl sm:text-4xl italic px-2">{data.sign}</span>
          
          {data.blank === 'y' ? renderInputField() : <span className="px-2">{data.y}</span>}
          
          <span className="text-gray-400">=</span>
          
          {data.blank === 'z' ? renderInputField() : <span className="px-2">{data.z}</span>}
        </div>

        <button 
          type="submit"
          className="px-8 py-4 bg-green-400 hover:bg-green-500 text-white font-bold text-2xl rounded-2xl border-b-8 border-green-600 active:border-b-0 active:translate-y-2 transition-all shadow-lg w-full sm:w-auto"
        >
          Check Answer ✔️
        </button>
      </form>

      {/* Visual Strawberries Area */}
      <div className="mt-12 w-full flex flex-col items-center bg-red-50 py-6 px-4 rounded-3xl border-4 border-red-100 min-h-[150px] justify-center overflow-hidden">
        <h3 className="text-lg font-bold text-red-400 mb-4 uppercase tracking-wide">Count the Strawberries</h3>
        
        {data.z === 0 ? (
          <div className="text-gray-400 font-bold text-2xl italic py-4">No strawberries! (0)</div>
        ) : (
          <div 
            className="grid gap-1 sm:gap-2 justify-center" 
            style={{ gridTemplateColumns: `repeat(${data.y}, max-content)` }}
          >
            {Array.from({ length: data.z }).map((_, i) => (
              <span key={i} className="text-2xl sm:text-3xl leading-none block transform hover:scale-125 transition-transform cursor-default">
                🍓
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}