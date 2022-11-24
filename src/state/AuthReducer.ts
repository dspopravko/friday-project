export type AuthReducerActionTypes =
    | ReturnType<typeof setAuth>

export const setAuth = (isAuth: boolean) => {
    return {
        type: "SET-AUTH",
        isAuth
    } as const
}

const initialState = {
   isAuth: false
}

type StateType = typeof initialState

export const AuthReducer = (state: StateType = initialState, action: AuthReducerActionTypes): StateType => {
    switch (action.type) {
        case "SET-AUTH":
            return {...state, isAuth: action.isAuth}
        default: return state
    }
}