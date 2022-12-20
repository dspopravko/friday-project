import { regReducer } from '../features/auth/signUp/services/signUpSlice'
import { appReducer } from './appSlice'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loginReducer } from '../features/auth/login/services/loginSlice'
import { restorePasswordReducer } from '../features/auth/restore/services/restorePasswordSlice'
import { newPasswordReducer } from '../features/auth/newPassword/services/newPasswordSlice'
import { profileReducer } from '../features/auth/profile/services/profileSlice'
import { packsReducer } from '../features/cards/packs/BLL/packsSlice'
import { cardsReducer } from '../features/cards/cards/BLL/cardsSlice'

export type ReduxStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  app: appReducer,
  auth: loginReducer,
  reg: regReducer,
  res: restorePasswordReducer,
  new: newPasswordReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer,
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
