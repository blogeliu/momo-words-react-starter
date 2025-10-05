import React from 'react'
import HelloWorld from '../components/HelloWorld'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <HelloWorld name="Boge" />
      <p style={{marginTop: 8}}>This is your starter screen. Now with Decks, Review, and Stats.</p>
      <ul className="grid">
        <li className="card">
          <h3 style={{marginTop: 0}}>Decks</h3>
          <p>View starter deck and launch a review session.</p>
          <Link className="btn" to="/decks">Open Decks</Link>
        </li>
        <li className="card">
          <h3 style={{marginTop: 0}}>Review</h3>
          <p>Start reviewing the demo deck right away.</p>
          <Link className="btn" to="/review?deck=demo-cn-en">Start Review</Link>
        </li>
        <li className="card">
          <h3 style={{marginTop: 0}}>Stats</h3>
          <p>Quick totals and due counts.</p>
          <Link className="btn" to="/stats">View Stats</Link>
        </li>
      </ul>
    </div>
  )
}
