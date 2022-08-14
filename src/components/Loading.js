import React from 'react'
import '../assets/styles/components/loading.css';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';

export default function Loading() {
  return (
    <div className='loading'><AiOutlineLoading3Quarters className='loading-icon'/></div>
  )
}
