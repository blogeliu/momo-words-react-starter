import React from 'react'
import { Link } from 'react-router-dom'
import { getAllDecks } from '../lib/sample'

export default function Decks() {
  const decks = getAllDecks()
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{margin:0}}>Decks</h2>
        <Link className="btn" to="/decks/new">+ Create Deck</Link>
      </div>
      <p>Starter data lives in your browser storage. You can change it later.</p>
      <ul className="grid">
        {decks.map(d => (
          <li key={d.id} className="card">
            <h3 style={{marginTop:0}}>{d.name}</h3>
            <p>{d.cards.length} cards</p>
            <Link className="btn" to={`/review?deck=${d.id}`}>Start Review</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
