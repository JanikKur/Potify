import React, { useState } from 'react'
import '../assets/styles/components/message.css';

export default function Message({message}) {

  const [hide, setHide] = useState(false);

  if(hide) return null;
  return (
    <aside className='message-wrapper'>
        <div className='message'>
          <p className='message-text'>{message}</p>
          <button className='main-button' onClick={() => setHide(true)}>Ok</button>
        </div>
    </aside>
  )
}
