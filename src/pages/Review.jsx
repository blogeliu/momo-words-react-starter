import React, { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getDeckById, updateDeck } from '../lib/sample'

function nextDueCard(deck) {
  const now = Date.now()
  const due = deck.cards.filter(c => (c.dueAt ?? 0) <= now)
  if (due.length) return due.sort((a,b)=> (a.dueAt??0)-(b.dueAt??0))[0]
  return deck.cards.sort((a,b)=> (a.dueAt??0)-(b.dueAt??0))[0]
}

function schedule(card, rating) {
  // 0=Again, 1=Good, 2=Easy (tiny SM-2 style)
  let ease = card.ease ?? 2.5
  let interval = card.interval ?? 0

  if (rating === 0) {
    interval = 1/24   // 1 hour
    ease = Math.max(1.3, ease - 0.2)
  } else if (rating === 1) {
    interval = interval ? interval * ease : 1
  } else {
    interval = interval ? interval * (ease + 0.5) : 3
    ease = ease + 0.05
  }
  const millis = Math.round(interval * 24 * 60 * 60 * 1000)
  const dueAt = Date.now() + millis
  return { ...card, ease, interval, dueAt }
}

export default function Review() {
  const [params] = useSearchParams()
  const deckId = params.get('deck') || 'demo-cn-en'
  const [deck, setDeck] = useState(()=> getDeckById(deckId))
  const [showAnswer, setShowAnswer] = useState(false)
  const card = useMemo(()=> nextDueCard(deck), [deck])

  if (!deck) {
    return <div><p>Deck not found.</p><Link className="btn" to="/decks">Back to Decks</Link></div>
  }

  function rate(r) {
    const updated = schedule(card, r)
    const newDeck = { ...deck, cards: deck.cards.map(c => c.id === card.id ? updated : c) }
    setDeck(newDeck)
    updateDeck(newDeck)
    setShowAnswer(false)
  }

  return (
    <div>
      <h2>Review — {deck.name}</h2>
      <div className="card">
        <p style={{fontSize:22, marginTop:0}}><strong>Term:</strong> {card.term}</p>
        {showAnswer
          ? <p style={{fontSize:20}}><strong>Definition:</strong> {card.definition}</p>
          : <button className="btn" onClick={()=> setShowAnswer(true)}>Show Answer</button>}
      </div>
      {showAnswer && (
        <div className="grid">
          <button className="btn" onClick={()=> rate(0)}>Again</button>
          <button className="btn" onClick={()=> rate(1)}>Good</button>
          <button className="btn" onClick={()=> rate(2)}>Easy</button>
        </div>
      )}
      <p style={{marginTop:16}}><Link to="/decks">Back to Decks</Link></p>
    </div>
  )
}
