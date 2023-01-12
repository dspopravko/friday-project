import { handleServerAppError } from './error-notification'
import { Dispatch } from '@reduxjs/toolkit'
import { fileToBase64 } from './fileToBase64'

/**
 * Checks the file size, if exceeded - dispatch an error, if it satisfies - call setter with the base64 string
 * @param file - File object
 * @param {string} setFile - Base64 string setter
 * @param dispatch - Redux dispatch
 * @param {string} fileSizeLimit - Limit file size in kB
 */

export const checkFileSize = async (
  file: File,
  setFile: (a: string) => void,
  dispatch: Dispatch,
  fileSizeLimit: number
) => {
  if (file.size < fileSizeLimit * 1000) {
    const res = await fileToBase64(file)
    setFile(res as string)
  } else {
    handleServerAppError(
      { error: `Maximum file size (${fileSizeLimit} kb) exceeded` },
      dispatch
    )
  }
}
