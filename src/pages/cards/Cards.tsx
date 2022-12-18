import React from 'react'
import { useParams } from 'react-router-dom'

export const Cards = () => {
  const { id } = useParams()
  return <div>Cards Card id: {id}</div>
}
