import React from 'react'
import { Link } from 'react-router-dom'

export default function UserIcon({name}) {
  return (
    <Link to="/settings" className="user-icon">{name}</Link>
  )
}
