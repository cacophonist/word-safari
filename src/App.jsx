import { useEffect, useRef, useState } from 'react';
import { makeQuestion, addLetter, undoLetter, hintLetters, isCorrect } from './game.js';

const games = [
  { id: 'scramble', title: 'Word Scramble', icon: '🔀', instruction: 'Tap the letters to spell the picture.' },
  { id: 'missing', title: 'Missing Letter', icon: '🔍', instruction: 'Tap the letter that fills the gap.' },
  { id: 'match', title: 'Word Match', icon: '✨', instruction: 'Tap the word that matches the picture.' },
  { id: 'math', title: 'Strawberry Maths', icon: '🍓', instruction: 'Count the strawberries. Type how many you see.' },
];

export default function App() {
  const [level, setLevel] = useState('beginner');
  const [view, setView] = useState('menu');
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState([]);
  const [number, setNumber] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hint, setHint] = useState('');
  const [audioMessage, setAudioMessage] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const heading = useRef(null);
  const speechId = useRef(0);
  const audioAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const activeGame = games.find(game => game.id === view);
  const solved = feedback?.type === 'success';
  const instruction = view === 'math' && level === 'practice'
    ? 'Count the equal groups. Type the total number of strawberries.' : activeGame?.instruction;

  useEffect(() => { heading.current?.focus(); }, [view]);
  useEffect(() => () => { if (audioAvailable) window.speechSynthesis.cancel(); }, [audioAvailable]);

  function stopAudio() {
    speechId.current += 1;
    if (audioAvailable) window.speechSynthesis.cancel();
    setSpeaking(false);
    setAudioMessage('');
  }
  function speak(text) {
    if (!audioAvailable) return;
    window.speechSynthesis.cancel();
    const id = ++speechId.current;
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.8;
    utterance.onend = () => { if (id === speechId.current) setSpeaking(false); };
    utterance.onerror = () => {
      if (id === speechId.current) {
        setSpeaking(false);
        setAudioMessage('Audio could not play. You can still use the pictures and instructions.');
      }
    };
    setAudioMessage('');
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }
  function newQuestion(game = view) {
    stopAudio();
    setQuestion(makeQuestion(game, level, question?.word));
    setSelected([]);
    setNumber('');
    setFeedback(null);
    setHint('');
    heading.current?.focus();
  }
  function startGame(game) { newQuestion(game); setView(game); }
  function check(answer) {
    if (solved) return;
    if (isCorrect(question, answer)) {
      setScore(value => value + 10);
      setFeedback({ type: 'success', message: `Well done! ${question.word || `${question.answer} strawberries`}. +10 stars!` });
    } else {
      setFeedback({ type: 'error', message: view === 'scramble'
        ? 'Have another go! Use Undo or Hint to help.'
        : 'Have another go! Look at the picture or listen to the question.' });
    }
  }
  function chooseLetter(id) {
    if (solved) return;
    const next = addLetter(selected, id, question.letters.length);
    setSelected(next);
    setFeedback(null);
    setHint('');
    if (next.length === question.letters.length) check(next.map(index => question.letters[index]).join(''));
  }
  function useHint() {
    const next = hintLetters(question, selected);
    setSelected(next);
    setFeedback(null);
    setHint(`Letter ${next.length} is ${question.word[next.length - 1]}.`);
    if (next.length === question.word.length) check(question.word);
  }
  function home() { stopAudio(); setView('menu'); setFeedback(null); setHint(''); }

  return (
    <div className="safari">
      <p className="family">✨ Tanya & Kabir play to learn ✨</p>
      <header>
        <h1>Word Safari 🐾</h1>
        <div className="header-actions">
          <span className="score" aria-label={`${score} stars`}>⭐ {score}</span>
          {view !== 'menu' && <button className="secondary" onClick={home}>Home 🏠</button>}
        </div>
      </header>
      <main>
        {view === 'menu' ? <>
          <h2 ref={heading} tabIndex={-1}>Choose a game!</h2>
          <fieldset className="levels">
            <legend>Choose your level</legend>
            <label><input type="radio" name="level" checked={level === 'beginner'} onChange={() => setLevel('beginner')} />
              <span><strong>Beginner</strong><small>Short words · Count to 5</small></span></label>
            <label><input type="radio" name="level" checked={level === 'practice'} onChange={() => setLevel('practice')} />
              <span><strong>More practice</strong><small>Longer words · Times tables</small></span></label>
          </fieldset>
          <div className="game-grid">{games.map(game => <button className={`game-choice ${game.id}`} key={game.id} onClick={() => startGame(game.id)}>
            <span aria-hidden="true" className="game-icon">{game.icon}</span>
            <strong>{game.title}</strong><span>{game.id === 'math' ? level === 'beginner' ? 'Count the berries!' : 'Explore equal groups!' : game.instruction}</span>
          </button>)}</div>
        </> : question && <section className="play-card" aria-labelledby="game-heading">
          <p className="level-tag">{level === 'beginner' ? 'Beginner' : 'More practice'}</p>
          <h2 id="game-heading" ref={heading} tabIndex={-1}>{activeGame.title}</h2>
          <p className="instruction">{instruction}</p>
          <div className="audio-actions">
            <button className="secondary" disabled={!audioAvailable} onClick={() => speak(instruction)}>🔊 Hear instructions</button>
            <button className="secondary" disabled={!audioAvailable} onClick={() => speak(view === 'math'
              ? level === 'beginner' ? 'How many strawberries can you count?' : `${question.x} groups of ${question.y}. How many strawberries altogether?`
              : question.word.toLowerCase())}>{view === 'math' ? '🔊 Hear question' : '🔊 Hear word'}</button>
            {speaking && <button className="secondary" onClick={stopAudio}>Stop audio</button>}
          </div>
          {!audioAvailable && <p className="audio-note">Audio is unavailable in this browser. All instructions are shown on screen.</p>}
          <p className="audio-note" role="status">{audioMessage}</p>
          {view !== 'math' && <div className="picture" role="img" aria-label={`Picture of ${question.word.toLowerCase()}`}>{question.emoji}</div>}
          {view === 'scramble' && <>
            <div className="letter-row" aria-label="Your spelling">{question.letters.map((_, index) => <button key={index}
              className={`letter slot ${selected[index] !== undefined ? 'filled' : ''}`} disabled={solved || selected[index] === undefined}
              aria-label={selected[index] === undefined ? `Empty space ${index + 1}` : `Remove ${question.letters[selected[index]]} from space ${index + 1}`}
              onClick={() => { setSelected(selected.filter((_, i) => i !== index)); setFeedback(null); setHint(''); }}>
              {selected[index] !== undefined ? question.letters[selected[index]] : '·'}
            </button>)}</div>
            <div className="letter-row" aria-label="Letters to choose">{question.letters.map((letter, id) => <button className="letter" key={id}
              aria-label={`Letter ${letter}, tile ${id + 1}`} disabled={solved || selected.includes(id)} onClick={() => chooseLetter(id)}>{letter}</button>)}</div>
            <div className="tools">
              <button className="secondary" disabled={solved || !selected.length} onClick={() => { setSelected(undoLetter(selected)); setFeedback(null); setHint(''); }}>↶ Undo</button>
              <button className="secondary" disabled={solved || !selected.length} onClick={() => { setSelected([]); setFeedback(null); setHint(''); }}>Start again</button>
              <button className="secondary" disabled={solved} onClick={useHint}>💡 Hint</button>
            </div>
            <p className="hint" role="status">{hint || 'Tap a filled space to take a letter back.'}</p>
          </>}
          {view === 'missing' && <>
            <div className="letter-row" aria-label={`Word: ${question.word.split('').map((char, i) => i === question.missing && !solved ? 'blank' : char).join(' ')}`}>
              {question.word.split('').map((char, i) => <span className={`letter ${i === question.missing && !solved ? 'slot' : 'filled'}`} key={i}>{i === question.missing && !solved ? '?' : char}</span>)}
            </div>
            <div className="letter-row">{question.options.map(letter => <button className="letter" key={letter} disabled={solved} onClick={() => check(letter)}>{letter}</button>)}</div>
          </>}
          {view === 'match' && <div className="word-options">{question.options.map(word => <button key={word} disabled={solved} onClick={() => check(word)}>{word}</button>)}</div>}
          {view === 'math' && <>
            {level === 'practice' && <p className="equation">{question.x} × {question.y} = ?</p>}
            <div className="berry-groups" role="img" aria-label={level === 'beginner' ? 'Strawberries to count' : `${question.x} equal groups of ${question.y} strawberries`}>
              {Array.from({ length: question.x }, (_, row) => <div className="berry-group" key={row}>{Array.from({ length: question.y }, (_, col) => <span aria-hidden="true" key={col}>🍓</span>)}</div>)}
            </div>
            <form onSubmit={event => { event.preventDefault(); if (number.trim()) check(Number(number)); }}>
              <label htmlFor="berry-answer">How many altogether?</label>
              <input id="berry-answer" type="number" inputMode="numeric" min="0" step="1" required value={number} disabled={solved}
                onChange={event => { setNumber(event.target.value); setFeedback(null); }} />
              <button disabled={solved || !number.trim()} type="submit">Check answer ✓</button>
            </form>
          </>}
          <div className={`feedback ${feedback?.type || ''}`} role="status" aria-live="polite">{feedback?.message}</div>
          {solved && <button className="next" onClick={() => newQuestion()}>Next question →</button>}
        </section>}
      </main>
      <footer>Take your time. Every try helps you learn. 🌱</footer>
    </div>
  );
}
