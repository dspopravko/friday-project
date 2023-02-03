import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { updateProfile } from './profileThunk'
import { authMe, login, logout } from '../../login/BLL/loginThunks'

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
    setProfilePhoto(state, action: PayloadAction<string>) {
      state.user.avatar = action.payload
    },
    resetState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.pending = true
        state.errors = ''
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.errors = JSON.stringify(action.payload)
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          avatar: action.payload.avatar,
          email: action.payload.email,
          publicCardPacksCount: action.payload.publicCardPacksCount,
        }
      })
      .addCase(authMe.rejected, () => {
        return initialState
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          avatar: action.payload.avatar,
          email: action.payload.email,
          publicCardPacksCount: action.payload.publicCardPacksCount,
        }
      })
      .addCase(login.rejected, () => {
        profileSlice.caseReducers.resetState()
      })
      .addCase(logout.fulfilled, () => {
        return initialState
      })
      .addMatcher(
        isAnyOf(
          updateProfile.fulfilled,
          updateProfile.rejected,
          authMe.fulfilled,
          login.fulfilled
        ),
        (state) => {
          state.pending = false
        }
      )
  },
})

export const profileReducer = profileSlice.reducer
export const profileActions = profileSlice.actions
