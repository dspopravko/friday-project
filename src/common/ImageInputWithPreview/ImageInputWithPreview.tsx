import React, { ChangeEvent, useRef } from 'react'
import { IconButton, Typography } from '@mui/material'
import { XButton } from '../'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { AnimatePresence, motion } from 'framer-motion'
import s from './ImageInputWithPreview.module.css'

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

  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.6 },
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 140, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ delay: 0, duration: 0.2 }}
      className={s.mainContainer}
    >
      <AnimatePresence>
        {avatar ? (
          <motion.div
            key={'contained'}
            variants={variants}
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            className={s.imageInputContainer}
          >
            <div className={s.previewImageContainer}>
              <img src={avatar} alt={'selected image'} />
            </div>
            <XButton type={'delete'} onClick={deleteImage}>
              delete
            </XButton>
          </motion.div>
        ) : (
          <motion.div
            key={'empty'}
            variants={variants}
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            className={s.imageInputContainer}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
