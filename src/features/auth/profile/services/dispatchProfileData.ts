import { fileToBase64 } from '../../../../services/fileToBase64'
import { LoginData } from '../profilePhoto'
import { AppDispatch } from '../../../../state/store'
import { updateProfile } from './updateProfileThunk'

export const dispatchProfileData = async (
  data: LoginData,
  dispatch: AppDispatch
) => {
  let photo
  if (data.avatar) {
    photo = await fileToBase64(data.avatar[0])
  }
  dispatch(
    updateProfile({
      name: data.name,
      avatar: photo as string,
      password: data.password,
    })
  )
}
