// Keep clear singular picture/word pairs; omit ambiguous scenes and labels.
export const wordBank = [
  ['CAT', '🐱'], ['DOG', '🐶'], ['SUN', '☀️'], ['BUS', '🚌'],
  ['CAR', '🚗'], ['PIG', '🐷'], ['ANT', '🐜'], ['BAT', '🦇'],
  ['BIRD', '🐦'], ['FROG', '🐸'], ['LION', '🦁'], ['BEAR', '🐻'],
  ['FISH', '🐟'], ['DUCK', '🦆'], ['STAR', '⭐'], ['MOON', '🌙'],
  ['TREE', '🌳'], ['KITE', '🪁'], ['BALL', '⚽'], ['CRAB', '🦀'],
  ['GOAT', '🐐'], ['SWAN', '🦢'], ['DEER', '🦌'], ['SEAL', '🦭'],
  ['DOOR', '🚪'], ['SOAP', '🧼'], ['BOOK', '📖'], ['BIKE', '🚲'],
  ['SHIP', '🚢'], ['TENT', '⛺'], ['ROCK', '🪨'], ['CORN', '🌽'],
  ['PEAR', '🍐'], ['KIWI', '🥝'], ['TACO', '🌮'], ['BABY', '👶'],
  ['NOSE', '👃'], ['HAND', '🖐️'], ['FOOT', '🦶'], ['BONE', '🦴'],
  ['RING', '💍'], ['SHOE', '👞'], ['BELL', '🔔'], ['CHAIR', '🪑'],
  ['PEACH', '🍑'], ['MOUSE', '🐁'], ['APPLE', '🍎'], ['ZEBRA', '🦓'],
].map(([word, emoji]) => ({ word, emoji }));

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function makeQuestion(game, level, previousWord, random = Math.random) {
  const beginner = level === 'beginner';
  const integer = max => Math.floor(random() * max);
  if (game === 'math') {
    const x = beginner ? 1 : 1 + integer(10);
    const y = beginner ? 1 + integer(5) : 1 + integer(10);
    return { game, x, y, answer: x * y };
  }
  const bank = wordBank.filter(item => beginner ? item.word.length === 3 : item.word.length >= 4);
  const pool = bank.filter(item => item.word !== previousWord);
  const item = pool[integer(pool.length)];
  const letters = shuffle(item.word.split(''), random);
  if (letters.join('') === item.word) {
    const different = letters.findIndex(char => char !== letters[0]);
    [letters[0], letters[different]] = [letters[different], letters[0]];
  }
  const missing = integer(item.word.length);
  const answer = game === 'missing' ? item.word[missing] : item.word;
  const distractors = game === 'missing'
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(letter => letter !== answer)
    : bank.filter(other => other.word !== answer).map(other => other.word);
  const options = shuffle([answer, ...shuffle(distractors, random).slice(0, beginner ? 1 : game === 'missing' ? 3 : 2)], random);
  return { ...item, game, letters, missing, answer, options };
}
export function addLetter(selected, id, length) {
  return selected.includes(id) || selected.length >= length ? selected : [...selected, id];
}
export function undoLetter(selected) { return selected.slice(0, -1); }
// Keep the correct prefix and reveal one next tile. IDs distinguish repeats.
export function hintLetters(question, selected) {
  const prefix = [];
  for (const id of selected) {
    if (question.letters[id] !== question.word[prefix.length]) break;
    prefix.push(id);
  }
  if (prefix.length < question.word.length) {
    prefix.push(question.letters.findIndex((char, id) => char === question.word[prefix.length] && !prefix.includes(id)));
  }
  return prefix;
}
export function isCorrect(question, answer) { return question.answer === answer; }
