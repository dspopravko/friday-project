import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateProfile } from './profileThunk'
import { authMe, login } from '../../login/BLL/loginThunks'

const initialState = {
  pending: false,
  errors: '',
  user: {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
  },
}

type userType = {
  _id: string
  email: string
  name: string
  publicCardPacksCount: number
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<userType>) {
      state.user = { ...state.user, ...action.payload }
    },
    resetUser(state) {
      state.user = {
        _id: '',
        name: '',
        email: '',
        publicCardPacksCount: 0,
        avatar: '',
      }
    },
    setProfilePhoto(state, action: PayloadAction<string>) {
      state.user.avatar = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state) => {
      state.pending = false
    })
    builder.addCase(updateProfile.pending, (state) => {
      state.pending = true
      state.errors = ''
    })
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.pending = false
      state.errors = JSON.stringify(action.payload)
    })
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.pending = false
      state.user = {
        _id: action.payload._id,
        name: action.payload.name,
        avatar: action.payload.avatar,
        email: action.payload.email,
        publicCardPacksCount: action.payload.publicCardPacksCount,
      }
    })
    builder.addCase(authMe.rejected, (state) => {
      profileSlice.caseReducers.resetUser(state)
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.pending = false
      state.user = {
        _id: action.payload._id,
        name: action.payload.name,
        avatar: action.payload.avatar,
        email: action.payload.email,
        publicCardPacksCount: action.payload.publicCardPacksCount,
      }
    })
    builder.addCase(login.rejected, (state) => {
      profileSlice.caseReducers.resetUser(state)
    })
  },
})

export const profileReducer = profileSlice.reducer
export const profileActions = profileSlice.actions
