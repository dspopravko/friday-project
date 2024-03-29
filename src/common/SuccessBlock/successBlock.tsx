import React, { ReactNode } from 'react'
import { Icon, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { theme } from '../../assets/mui-theme'
import { motion } from 'framer-motion'

type SuccessPropsType = {
  title?: string
  description?: string
  children: ReactNode
  email?: string
  GoTo?: {
    title: string
    path: string
  }
}

export const SuccessBlock = ({
  title = 'Instruction was sent to:',
  email = 'Your email address',
  description = 'Please check it',
  children,
  GoTo,
}: SuccessPropsType) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0, duration: 0.2 }}
    >
      <div
        style={{
          height: '160px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#62c997',
        }}
      >
        <Icon sx={{ transform: 'scale(4)', mb: '0px' }}>{children}</Icon>
      </div>
      <Typography>
        {title}
        <br />
        <span
          style={{ display: 'inline-block', fontWeight: 'bold', margin: '8px' }}
        >
          {email}
        </span>
        <br />
        {description}
      </Typography>

      {GoTo && (
        <NavLink
          replace
          to={GoTo.path}
          style={{
            textDecoration: 'underline',
            color: theme.palette.primary.light,
            marginBottom: '20px',
          }}
        >
          <Typography
            variant={'h6'}
            textAlign={'center'}
            sx={{
              '&:hover': {
                fontWeight: '600',
              },
            }}
          >
            {GoTo.title}
          </Typography>
        </NavLink>
      )}
    </motion.div>
  )
}
