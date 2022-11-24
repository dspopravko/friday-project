import {AuthReducer, AuthReducerActionTypes} from "./AuthReducer";
import {applyMiddleware, combineReducers, legacy_createStore, Store} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export type ActionTypes = AuthReducerActionTypes // || 👈 Additional reducers AT go here
export type ReduxStateType = ReturnType<typeof rootReducer>
export type StoreType = Store<ReduxStateType, ActionTypes>

const rootReducer = combineReducers({
    auth: AuthReducer
})

export const store: StoreType = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>
type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, ActionTypes>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionTypes>