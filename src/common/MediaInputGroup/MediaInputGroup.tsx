import React, { useRef, useState } from 'react'
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import { ImageInputWithPreview } from '../ImageInputWithPreview'
import { checkFileSize } from '../../services/checkFileSize'
import { useAppDispatch } from '../../state/store'
import s from './MediaInputGroup.module.css'
import { AnimatePresence } from 'framer-motion'

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
    checkFileSize(file, setInputImage, dispatch, 300)

  const resetImage = () => {
    setInputImage('')
    if (fileInput.current && fileInput.current.value) {
      fileInput.current.value = ''
    }
  }

  return (
    <div className={s.mediaGroupContainer}>
      <div className={s.viewContainer}>
        <Typography sx={{ textTransform: 'capitalize' }} variant={'h6'}>
          {title}
        </Typography>
        <div className={s.headerGroup}>
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
        </div>
      </div>

      <TextField
        label={`${title} text`}
        variant="standard"
        multiline
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className={s.mediaInputContiner}>
        <AnimatePresence>
          {value.some((i) => i === 'image') && (
            <ImageInputWithPreview
              key={'image'}
              title={`Upload ${title} image`}
              deleteImage={resetImage}
              avatar={inputImage}
              handleFileInput={handleFileInput}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
