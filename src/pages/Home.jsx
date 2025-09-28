import React from 'react'
import HelloWorld from '../components/HelloWorld'

export default function Home() {
  return (
    <div>
      <HelloWorld name="Boge" />
      <p style={{marginTop: 8}}>This is your starter screen. Replace this with your review deck, spaced repetition dashboard, etc.</p>
      <ul className="grid">
        <li>✅ React + Vite</li>
        <li>✅ React Router</li>
        <li>✅ Sample component</li>
        <li>✅ Project structure</li>
        <li>✅ README included</li>
      </ul>
    </div>
  )
}
