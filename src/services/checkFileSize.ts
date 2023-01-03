import { fileFromInputToBase64 } from '../features/auth/profile/BLL/fileFromInputToBase64'
import { handleServerAppError } from './error-notification'
import { Dispatch } from '@reduxjs/toolkit'

export const checkFileSize = async (
  file: File,
  setFile: (a: string) => void,
  dispatch: Dispatch
) => {
  if (file.size < 300000) {
    const file64 = await fileFromInputToBase64(file)
    setFile(file64)
  } else {
    handleServerAppError(
      { error: 'Maximum file size (300 kb) exceeded' },
      dispatch
    )
  }
}
