import { regReducer } from '../features/auth/services/signUp/signUpSlice'
import { appReducer } from './appSlice'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authReducer } from '../features/auth/services/login/loginSlice'
import { restorePasswordReducer } from '../features/auth/services/restore/restorePasswordSlice'
import { newPasswordReducer } from '../features/auth/services/newPassword/newPasswordSlice'

export type ReduxStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  reg: regReducer,
  res: restorePasswordReducer,
  new: newPasswordReducer,
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
