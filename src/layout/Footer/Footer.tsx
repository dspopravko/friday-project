import React from 'react'
import s from './Footer.module.css'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../data/paths'

export const Footer = () => {
  const activeColor = 'var(--link-color)'
  const color = 'var(--text-color)'
  return (
    <div className={s.footer}>
      <NavLink
        to={PATH.LOGIN.MAIN}
        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
        end
      >
        Login Page
      </NavLink>

      <NavLink
        to={PATH.LOGIN.SIGNUP}
        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
      >
        Registration
      </NavLink>

      <NavLink
        replace
        to={PATH.LOGIN.RESTORE}
        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
      >
        Restore password
      </NavLink>

      <NavLink
        replace
        to={PATH.NEWPASSWORD + '/' + '3cv3-some-test-token-abcd-3f'}
        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
      >
        New password
      </NavLink>

      <NavLink
        to={PATH.TESTS}
        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
      >
        Tests
      </NavLink>

      <NavLink
        to={PATH.PROFILE}
        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
      >
        Profile
      </NavLink>
      <NavLink
        to={PATH.PACKS}
        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
      >
        Packs
      </NavLink>
    </div>
  )
}
