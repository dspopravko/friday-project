import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authApi} from "./services/auth-api";
import {authPayload} from "./services/models/auth-payload";
import {handleServerNetworkError} from "../../services/error-notification";

type userType = {
    _id: string
    email: string
    name: string
    publicCardPacksCount: number
}

const initialState = {
    isAuth: false,
    user: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<userType>) {
            state.user = {...state.user, ...action.payload}
        },
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setProfilePhoto(state, action: PayloadAction<string>) {
            state.user.avatar = action.payload
        }
    }
})

export const authMe = () => async (dispatch: Dispatch) => {
    try {
        await authApi.me()
        dispatch(authSlice.actions.setAuth(true))
    } catch (e) {
        dispatch(authSlice.actions.setAuth(false))
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    }
}
export const login = (payload: authPayload) => async (dispatch: Dispatch) => {
    try {
        const res = await authApi.login(payload)
        dispatch(authSlice.actions.setAuth(true))
        const user: userType = {
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            publicCardPacksCount: res.data.publicCardPacksCount
        }
        dispatch(authSlice.actions.setUser(user))
    } catch (e) {
        console.log(e)
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    }
}
export const logout = () => async (dispatch: Dispatch) => {
    try {
        await authApi.logout()
        dispatch(authSlice.actions.setAuth(false))
    } catch (e) {
        if (e instanceof Error) handleServerNetworkError(e, dispatch)
    }
}


export const authReducer = authSlice.reducer

export type AppReducerStateType = typeof initialState
export const appReducer = authSlice.reducer