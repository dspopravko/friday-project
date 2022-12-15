import { useEffect } from 'react'
import { authMe } from './login/loginThunks'
import { useAppDispatch } from '../../../state/store'

export function authMeHook() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authMe())
  }, [])
}
