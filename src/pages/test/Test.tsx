import React from 'react'
import s from './Test.module.css'
import XSelect from '../../common/selectors/Select/XSelect'
import { mockSelect } from '../../data/selectOptions'
import { useAppDispatch, useAppSelector } from '../../state/store'
import {
  authMe,
  login,
  logout,
} from '../../features/auth/login/BLL/loginThunks'
import { loginPayload } from '../../features/auth/login/API/loginAPI'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { isAuthSelector } from '../../features/auth/common/selectors/selectorsAuth'
import { Typography } from '@mui/material'
import XButton from '../../common/Button/XButton'
import XInput from '../../common/Input/XInput'
import XRadio from '../../common/Radio/XRadio'

export const Test = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(isAuthSelector)
  useSetHeaderTitle(`Tests, isAuth: ${isAuth}`, 'Tests')
  const checkMe = () => dispatch(authMe())
  const authCorrect = () => {
    const auth: loginPayload = {
      email: 'nya-admin@nya.nya',
      password: '1qazxcvBG',
    }
    dispatch(login(auth))
  }
  const logoutHandler = () => dispatch(logout())

  return (
    <div className="pageContainer">
      <h1 style={{ margin: '20px 0' }}>Here are the template components:</h1>
      <hr />
      Current backend URL {process.env.REACT_APP_BACK_URL}
      <div className={s.container}>
        <div className={s.item}>
          Buttons:
          <XButton onClick={authCorrect} type={'primary'}>
            Auth (correct login:password)
          </XButton>
          <XButton onClick={checkMe} type={'secondary'}>
            check me
          </XButton>
          <XButton onClick={logoutHandler} type={'delete'}>
            Logout
          </XButton>
          <XButton onClick={logoutHandler} disabled>
            Disabled
          </XButton>
        </div>
        <div className={s.item}>
          Input: (without logic)
          <XInput />
        </div>
        <div className={s.item}>
          Select: (without logic)
          <XSelect options={mockSelect} />
        </div>
        <div className={s.item}>
          Radio: (without logic)
          <XRadio value={1} options={mockSelect} />
        </div>
        <div>
          <Typography>Some</Typography>
        </div>
      </div>
    </div>
  )
}
