import React from 'react'
import s from './Error404.module.css'
import { setTitle } from '../../services/setHeaderTitle'

export const Error404 = () => {
  setTitle('💃')
  return (
    <div className={s.container}>
      <h1>Error 404</h1>
      Page not found
      <span style={{ fontSize: '36px', padding: '20px' }}>👨‍🔧</span>
    </div>
  )
}
