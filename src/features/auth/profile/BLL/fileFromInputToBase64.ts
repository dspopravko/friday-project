import { fileToBase64 } from '../../../../services/fileToBase64'

export const fileFromInputToBase64 = async (data: File) => {
  const file = await fileToBase64(data)
  return file as string
}
