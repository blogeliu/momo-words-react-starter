import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Decks from './pages/Decks.jsx'
import Review from './pages/Review.jsx'
import Stats from './pages/Stats.jsx'
import CreateDeck from './pages/CreateDeck.jsx'   
import GenerateAI from './pages/GenerateAI.jsx'


import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'decks', element: <Decks /> },
      { path: 'decks/new', element: <CreateDeck /> },
      { path: 'review', element: <Review /> },
      { path: 'stats', element: <Stats /> },
      { path: 'generate', element: <GenerateAI /> },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
