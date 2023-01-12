import { regReducer } from '../features/auth/signUp/services/signUpSlice'
import { appReducer } from './appSlice'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loginReducer } from '../features/auth/login/BLL/loginSlice'
import { resPassReducer } from '../features/auth/restore/BLL/restorePasswordSlice'
import { newPasswordReducer } from '../features/auth/newPassword/BLL/newPasswordSlice'
import { profileReducer } from '../features/auth/profile/BLL/profileSlice'
import { packsReducer } from '../features/packs/BLL/packsSlice'
import { cardsReducer } from '../features/cards/BLL/cardsSlice'
import { learnReducer } from '../features/learn/BLL/learnSlice'
import { usersReducer } from '../features/users/BLL/usersSlice'
import { userReducer } from '../features/user/BLL/userSlice'

const rootReducer = combineReducers({
  app: appReducer,
  auth: loginReducer,
  reg: regReducer,
  res: resPassReducer,
  new: newPasswordReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer,
  learn: learnReducer,
  users: usersReducer,
  user: userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware).concat(logger),
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
