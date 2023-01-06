import React, { ChangeEvent, useRef } from 'react'
import { theme } from '../../assets/mui-theme'
import { IconButton, Paper, Typography } from '@mui/material'
import { XButton } from '../'
import FileUploadIcon from '@mui/icons-material/FileUpload'

type ImagePreviewPropsType = {
  title?: string
  avatar: string | undefined
  deleteImage: () => void
  handleFileInput: (file: File) => void
}
export const ImageInputWithPreview = ({
  title = 'Upload an image',
  avatar,
  deleteImage,
  handleFileInput,
}: ImagePreviewPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => inputRef && inputRef.current?.click()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      handleFileInput(file)
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.grey.A200,
        margin: '10px auto 0 auto',
        width: '120px',
        height: '140px',
        borderRadius: '12px',
      }}
    >
      {avatar ? (
        <>
          <Paper
            sx={{ width: 80, height: 80, borderRadius: '50%' }}
            variant="outlined"
          >
            <img
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              src={avatar}
              alt={'selected image'}
            />
          </Paper>
          <XButton type={'delete'} onClick={deleteImage}>
            delete
          </XButton>
        </>
      ) : (
        <>
          <Typography align={'center'}>{title}</Typography>
          <IconButton onClick={selectFileHandler} component={'span'}>
            <FileUploadIcon fontSize={'large'} />
          </IconButton>
          <input
            type="file"
            accept="image/png, image/jpeg"
            hidden
            ref={inputRef}
            onChange={uploadHandler}
          />
        </>
      )}
    </div>
  )
}
