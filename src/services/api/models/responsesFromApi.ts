//черновик, это всё надо рефакторить

export type commonError<T> = {
    error: string
    method?: string
    url?: string
    query?: {}
    body?: T
}

export type registerError = commonError<{ email: string, password: string }>

export type registerAlreadyExists = {
    error: string
    email: string
    in: string
}

export type registerValidationError = {
    error: string
    in: string
    isEmailValid: boolean,
    isPassValid: boolean,
    emailRegExp: {},
    passwordRegExp: string
}

export type registerSuccess = {
    addedUser: {
        _id: string
        email: string
        rememberMe: boolean,
        isAdmin: boolean,
        name: string
        verified: boolean,
        publicCardPacksCount: number,
        created: Date
        updated: Date
        __v: number
    }
}

export type meFalse = {
    error: string
    in: string
}

export type loginSuccess = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: Date
    updated: Date
    __v: number
    token: string
    tokenDeathTime: number
}
export type loginFailed = {
    error: string
    password: string
    in: string
}