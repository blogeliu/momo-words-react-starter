import React from 'react'

export default function HelloWorld({ name = 'World' }) {
  return <h1>Hello {name}! React is running locally ✅</h1>
}
