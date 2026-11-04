import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wordBank, makeQuestion, addLetter, undoLetter, hintLetters, isCorrect } from './game.js';

test('picture labels are unique and known mismatches are corrected', () => {
  assert.equal(new Set(wordBank.map(item => item.word)).size, wordBank.length);
  assert.equal(wordBank.find(item => item.word === 'CHAIR').emoji, '🪑');
  assert.equal(wordBank.find(item => item.word === 'PEACH').emoji, '🍑');
  assert.equal(wordBank.find(item => item.word === 'MOUSE').emoji, '🐁');
  for (const word of ['DESK', 'PLUM', 'MICE', 'ANTS', 'BATS', 'FORK']) assert.ok(!wordBank.some(item => item.word === word));
});

test('both levels produce valid words, gaps, options, and changed scrambles', () => {
  for (const level of ['beginner', 'practice']) {
    for (const game of ['scramble', 'missing', 'match']) {
      for (let i = 0; i < 300; i++) {
        const q = makeQuestion(game, level);
        assert.ok(level === 'beginner' ? q.word.length === 3 : q.word.length >= 4);
        assert.deepEqual([...q.letters].sort(), q.word.split('').sort());
        assert.notEqual(q.letters.join(''), q.word);
        assert.ok(q.options.includes(q.answer));
        assert.equal(new Set(q.options).size, q.options.length);
        assert.equal(q.options.length, level === 'beginner' ? 2 : game === 'missing' ? 4 : 3);
        assert.ok(q.missing >= 0 && q.missing < q.word.length);
        assert.ok(isCorrect(q, q.answer));
        assert.ok(!isCorrect(q, 'wrong'));
        assert.notEqual(makeQuestion(game, level, q.word).word, q.word);
      }
    }
  }
});

test('beginner counts 1–5; practice uses positive factors and the exact total', () => {
  for (let i = 0; i < 1000; i++) {
    const q = makeQuestion('math', 'beginner');
    assert.equal(q.x, 1);
    assert.ok(q.answer >= 1 && q.answer <= 5);
    const p = makeQuestion('math', 'practice');
    assert.ok(p.x >= 1 && p.x <= 10 && p.y >= 1 && p.y <= 10);
    assert.equal(p.answer, p.x * p.y);
    assert.ok(!isCorrect(p, p.answer + 0.5));
  }
});

test('scramble recovers from wrong answers, duplicate letters, and full slots', () => {
  const q = { word: 'BELL', letters: ['L', 'E', 'B', 'L'], answer: 'BELL' };
  assert.deepEqual(addLetter([2], 2, 4), [2]);
  assert.deepEqual(addLetter([2, 1, 0, 3], 1, 4), [2, 1, 0, 3]);
  assert.deepEqual(undoLetter([2, 1]), [2]);
  assert.deepEqual(undoLetter([]), []);
  assert.deepEqual(hintLetters(q, [0, 1, 2, 3]), [2]);
  assert.deepEqual(hintLetters(q, [2, 0]), [2, 1]);
  let selected = [];
  for (let i = 0; i < 4; i++) selected = hintLetters(q, selected);
  assert.equal(new Set(selected).size, 4);
  assert.ok(isCorrect(q, selected.map(id => q.letters[id]).join('')));
});
