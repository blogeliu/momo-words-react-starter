import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { generateFlashcards } from '../lib/ai'
import { updateDeck } from '../lib/sample'

export default function GenerateAI() {
  const [text, setText] = useState('')
  const [lang, setLang] = useState('zh-CN')
  const [name, setName] = useState('')
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  async function onGenerate() {
    setErr('')
    if (!text.trim()) return setErr('Please enter a topic or paste some text.')
    setLoading(true)
    try {
      const out = await generateFlashcards(text, lang)
      setCards(out)
      if (!name.trim()) setName('AI Deck ' + new Date().toLocaleString())
    } catch (e) {
      console.error(e)
      setErr('Generation failed. Check console.')
    } finally {
      setLoading(false)
    }
  }

  function onSave() {
    if (!name.trim()) return setErr('Please give this deck a name.')
    if (!cards.length) return setErr('No cards to save.')

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now()
    const deck = { id, name: name.trim(), createdAt: Date.now(), cards }
    updateDeck(deck)
    navigate('/decks')
  }

  function updateCard(i, key, val) {
    setCards(cs => cs.map((c, idx) => idx === i ? { ...c, [key]: val } : c))
  }

  return (
    <div>
      <h2>AI Generate Flashcards</h2>
      <p>Paste a topic or a paragraph. We’ll suggest cards; you can edit before saving.</p>
      {err && <p style={{color:'#ff6b6b'}}>{err}</p>}

      <div className="card">
        <div style={{display:'grid', gap:12}}>
          <label>
            <div>Deck Name</div>
            <input
              style={{width:'100%', padding:10, borderRadius:10}}
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Biology: Cells (EN → 中文)"
            />
          </label>

          <label>
            <div>Target Language</div>
            <select
              style={{width:'100%', padding:10, borderRadius:10}}
              value={lang}
              onChange={(e)=>setLang(e.target.value)}
            >
              <option value="zh-CN">中文 (简体)</option>
              <option value="en">English</option>
            </select>
          </label>

          <label>
            <div>Topic or Source Text</div>
            <textarea
              rows={8}
              style={{width:'100%', padding:12, borderRadius:12}}
              value={text}
              onChange={(e)=>setText(e.target.value)}
              placeholder="Paste a short article or describe a topic (e.g., 'Basal metabolism and nutrition')."
            />
          </label>

          <div style={{display:'flex', gap:10}}>
            <button className="btn" type="button" onClick={onGenerate} disabled={loading}>
              {loading ? 'Generating…' : 'Generate'}
            </button>
            <Link className="btn" to="/decks">Back</Link>
          </div>
        </div>
      </div>

      {cards.length > 0 && (
        <div style={{marginTop:16}}>
          <h3 style={{marginTop:0}}>Preview & Edit ({cards.length})</h3>
          <div className="grid">
            {cards.map((c, i) => (
              <div key={i} className="card">
                <input
                  style={{width:'100%', padding:8, borderRadius:8, marginBottom:8}}
                  value={c.term}
                  onChange={(e)=>updateCard(i,'term', e.target.value)}
                />
                <input
                  style={{width:'100%', padding:8, borderRadius:8}}
                  value={c.definition}
                  onChange={(e)=>updateCard(i,'definition', e.target.value)}
                />
              </div>
            ))}
          </div>
          <div style={{marginTop:12}}>
            <button className="btn" onClick={onSave}>Save Deck</button>
          </div>
        </div>
      )}
    </div>
  )
}
