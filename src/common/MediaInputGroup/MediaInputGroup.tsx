import React, { useRef, useState } from 'react'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { ImageInputWithPreview } from '../ImageInputWithPreview/ImageInputWithPreview'
import { checkFileSize } from '../../services/checkFileSize'
import { useAppDispatch } from '../../state/store'

type MediaInputPropsType = {
  title: string
  inputText: string
  setInputText: (input: string) => void
  inputImage: string
  setInputImage: (input: string) => void
}

export const MediaInputGroup = ({
  title,
  inputText,
  setInputText,
  inputImage,
  setInputImage,
}: MediaInputPropsType) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const [value, setValue] = useState(() => [
    'text',
    inputImage ? 'image' : null,
  ])
  const handleCheckBox = (checked: boolean, inputType: string) => {
    checked
      ? setValue([...value, inputType])
      : setValue([...value.filter((i) => i !== inputType)])
  }

  const handleFileInput = (file: File) =>
    checkFileSize(file, setInputImage, dispatch)

  const resetImage = () => {
    setInputImage('')
    if (fileInput.current && fileInput.current.value) {
      fileInput.current.value = ''
    }
  }

  return (
    <Paper sx={{ p: 1 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ textTransform: 'capitalize' }} variant={'h6'}>
          {title}
        </Typography>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={value.some((i) => i === 'image')}
                onChange={(e, checked) => {
                  handleCheckBox(checked, 'image')
                }}
              />
            }
            label="Add image"
          />
        </Box>
      </Box>

      <TextField
        label={`${title} text`}
        variant="standard"
        multiline
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      {value.some((i) => i === 'image') && (
        <ImageInputWithPreview
          title={`Upload ${title} image`}
          deleteImage={resetImage}
          avatar={inputImage}
          handleFileInput={handleFileInput}
        />
      )}
    </Paper>
  )
}
