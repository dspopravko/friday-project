import { fileToBase64 } from '../../../../services/fileToBase64'
import { LoginData } from '../UI/updateProfileContainer'
import { AppDispatch } from '../../../../state/store'
import { updateProfile } from './profileThunk'

export const dispatchProfileData = async (
  data: LoginData,
  dispatch: AppDispatch
) => {
  let photo
  if (data.avatar.item(0)) {
    photo = await fileToBase64(data.avatar[0])
  }
  dispatch(
    updateProfile({
      name: data.name,
      avatar: photo as string,
    })
  )
}
