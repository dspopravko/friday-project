import React, { useContext, useEffect } from 'react'
import XButton from '../../common/components/button/XButton'
import { HeaderTitleContext } from '../../context/context'
import XInput from '../../common/components/input/XInput'
import s from './Test.module.css'
import XSelect from '../../common/components/select/XSelect'
import XRadio from '../../common/components/radio/XRadio'
import { mockSelect } from '../../data/selectOptions'
import { setPageTitle } from '../../services/pageTitle'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { authPayload } from '../../features/auth/services/models/auth-payload'
import { authMe, login, logout } from '../../features/auth/authSlice'

export const Test = () => {
  const dispatch = useAppDispatch()
  const { setTitle } = useContext(HeaderTitleContext)
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  useEffect(() => {
    setTitle(`Tests, isAuth: ${isAuth}`)
    setPageTitle(`Tests`)
  }, [isAuth])

  const checkMe = () => dispatch(authMe())

  const authCorrect = () => {
    const auth: authPayload = {
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
          <XButton onClick={authCorrect}>Auth (correct login:password)</XButton>
          <XButton onClick={checkMe}>check me</XButton>
          <XButton onClick={logoutHandler} xType={'secondary'}>
            Logout
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
      </div>
    </div>
  )
}
