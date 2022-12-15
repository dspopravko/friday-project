import { regReducer } from '../features/auth/components/signUp/form/signUpSlice'
import { appReducer } from './appSlice'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authReducer } from '../features/auth/services/login/loginSlice'

export type ReduxStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  reg: regReducer,
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
