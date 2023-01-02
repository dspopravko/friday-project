import React from 'react'
import s from './AppLoader.module.css'

export const AppLoader = () => (
  <div
    style={{
      background: '#f6f6f6',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    }}
  >
    <span
      style={{ marginBottom: '50px', transform: 'scale(1.5)' }}
      className={s.loader}
    ></span>
  </div>
)
