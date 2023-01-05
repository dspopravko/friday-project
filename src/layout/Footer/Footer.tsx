import React from 'react'
import s from './Footer.module.css'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../data/paths'
import { useAppDispatch } from '../../state/store'
import { loginPayload } from '../../features/auth/login/API/loginAPI'
import { login } from '../../features/auth/login/BLL/loginThunks'

export const Footer = () => {
  const activeColor = 'var(--link-color)'
  const color = 'var(--text-color)'
  const dispatch = useAppDispatch()
  const authCorrect = () => {
    const auth: loginPayload = {
      email: 'nya-admin@nya.nya',
      password: '1qazxcvBG',
    }
    dispatch(login(auth))
  }
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
      <NavLink
        to={PATH.CARDS}
        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
      >
        Cards
      </NavLink>
      <NavLink
        to={PATH.USERS}
        style={({ isActive }) => ({ color: isActive ? activeColor : color })}
      >
        Users
      </NavLink>

      <button onClick={() => authCorrect()}>auth correct</button>
    </div>
  )
}
