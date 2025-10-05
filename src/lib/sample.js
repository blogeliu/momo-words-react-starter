import { loadState, saveState } from './storage';

export function ensureSampleData() {
  const existing = loadState();
  if (existing && existing.decks && existing.decks.length) return existing;

  const now = Date.now();
  const state = {
    decks: [
      {
        id: 'demo-cn-en',
        name: 'Demo: 中文 ↔ English',
        createdAt: now,
        cards: [
          { id: 'w1', term: 'apple',   definition: '苹果', ease: 2.5, interval: 0, dueAt: now },
          { id: 'w2', term: 'water',   definition: '水',   ease: 2.5, interval: 0, dueAt: now },
          { id: 'w3', term: 'book',    definition: '书',   ease: 2.5, interval: 0, dueAt: now },
          { id: 'w4', term: 'student', definition: '学生', ease: 2.5, interval: 0, dueAt: now },
          { id: 'w5', term: 'teacher', definition: '老师', ease: 2.5, interval: 0, dueAt: now },
        ]
      }
    ]
  };
  saveState(state);
  return state;
}

export function getDeckById(id) {
  const state = ensureSampleData();
  return state.decks.find(d => d.id === id);
}

export function updateDeck(deck) {
  const state = ensureSampleData();
  const idx = state.decks.findIndex(d => d.id === deck.id);
  if (idx >= 0) state.decks[idx] = deck;
  else state.decks.push(deck);
  saveState(state);
  return deck;
}

export function getAllDecks() {
  const state = ensureSampleData();
  return state.decks;
}
export function deleteDeck(deckId) {
  const state = ensureSampleData();
  const decks = state.decks.filter(d => d.id !== deckId);
  saveState({ decks });              // keep the same shape { decks: [...] }
  return decks;
}

