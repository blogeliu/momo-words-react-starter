import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { updateDeck } from '../lib/sample'

function parseCards(text) {
  // Accept formats like:
  //  apple - 苹果
  //  water: 水
  //  book, 书
  //  student    学生   (whitespace separated)
  return text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean)
    .map((line, idx) => {
      let [term, def] = line.split(/\s*[-,:]\s*|[\t]{1,}|\s{2,}/) // -, :, comma, tabs, or 2+ spaces
      if (!def) {
        const parts = line.split(/\s+/)
        term = parts[0]
        def  = parts.slice(1).join(' ')
      }
      return { id: `c${idx+1}`, term: term?.trim() || '', definition: def?.trim() || '', ease: 2.5, interval: 0, dueAt: Date.now() }
    })
    .filter(c => c.term && c.definition)
}

export default function CreateDeck() {
  const [name, setName] = useState('')
  const [rawCards, setRawCards] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    setErr('')

    const cards = parseCards(rawCards)
    if (!name.trim())  return setErr('Please enter a deck name.')
    if (cards.length === 0) return setErr('Please add at least one card.')

    const id = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now()

    const deck = { id, name: name.trim(), createdAt: Date.now(), cards }
    updateDeck(deck)

    navigate(`/decks`) // go back to list
  }

  return (
    <div>
      <h2>Create Deck</h2>
      <p>Enter a deck name and paste cards. One card per line, e.g. <code>apple - 苹果</code>.</p>
      {err && <p style={{color:'#ff6b6b'}}>{err}</p>}

      <form onSubmit={submit} style={{display:'grid', gap:12}}>
        <label>
          <div>Deck Name</div>
          <input
            style={{width:'100%', padding:10, borderRadius:10}}
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="HSK 1 Nouns (EN ↔ 中文)"
          />
        </label>

        <label>
          <div>Cards (one per line)</div>
          <textarea
            rows={10}
            style={{width:'100%', padding:12, borderRadius:12}}
            value={rawCards}
            onChange={e=>setRawCards(e.target.value)}
            placeholder="apple - 苹果\nwater - 水\nbook - 书"
          />
        </label>

        <div style={{display:'flex', gap:10}}>
          <button className="btn" type="submit">Create Deck</button>
          <Link className="btn" to="/decks">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
