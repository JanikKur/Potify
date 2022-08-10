import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main>
        <h1>404 - The Page you are looking for doesn’t exist</h1>
        <Link to='/' className="main-button">Back to Home</Link>
    </main>
  )
}
