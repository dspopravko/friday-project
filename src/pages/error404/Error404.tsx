import React from 'react'
import s from './Error404.module.css'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'

export const Error404 = () => {
  useSetHeaderTitle('💃')
  return (
    <div className={s.container}>
      <h1>Error 404</h1>
      Page not found
      <span style={{ fontSize: '36px', padding: '20px' }}>👨‍🔧</span>
    </div>
  )
}
