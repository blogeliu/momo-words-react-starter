import React from 'react'
import { getAllDecks } from '../lib/sample'

export default function Stats() {
  const decks = getAllDecks()
  const total = decks.reduce((s,d)=> s + d.cards.length, 0)
  const due = decks.reduce((s,d)=> s + d.cards.filter(c => (c.dueAt??0) <= Date.now()).length, 0)
  return (
    <div>
      <h2>Stats</h2>
      <div className="grid">
        <div className="card"><h3 style={{marginTop:0}}>Decks</h3><p>{decks.length}</p></div>
        <div className="card"><h3 style={{marginTop:0}}>Total Cards</h3><p>{total}</p></div>
        <div className="card"><h3 style={{marginTop:0}}>Due Now</h3><p>{due}</p></div>
      </div>
    </div>
  )
}
