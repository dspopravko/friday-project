import React from 'react'
import { useSearchParams } from 'react-router-dom'

export const UseSearchParamsObject = () => {
  const [searchParams] = useSearchParams()
  return Object.fromEntries(searchParams)
}
