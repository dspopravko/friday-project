import { motion } from 'framer-motion'
import React from 'react'
import s from './AppLoader.module.css'

export const AppLoader = () => (
  <motion.div
    initial={{ opacity: 0, y: 200 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 200 }}
    transition={{ delay: 0, duration: 0.3 }}
    style={{
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      overflow: "hidden"
    }}
  >
    <span
      style={{ transform: 'scale(1.5)' }}
      className={s.loader}
    ></span>
  </motion.div>
)
