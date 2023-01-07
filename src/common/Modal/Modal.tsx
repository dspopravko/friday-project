import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { Divider, Fade } from '@mui/material'
import Container from '@mui/material/Container'
import { XButton } from '../'
import s from './Modal.module.css'

type BasicModalType = {
  children: React.ReactNode
  title: string
  buttonType: 'send' | 'save' | 'delete'
  handleClose: () => void
  open: boolean
  buttonCallback?: () => void
}

export function BasicModal({
  open,
  handleClose,
  buttonCallback,
  buttonType,
  title,
  children,
}: BasicModalType) {
  return (
    <div>
      <Modal closeAfterTransition open={open} onClose={handleClose}>
        <Fade in={open}>
          <Box className={s.modalContainer}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className={s.titleStyle}
            >
              {title}
              <IconButton onClick={handleClose} sx={{ padding: '0' }}>
                <CloseIcon />
              </IconButton>
            </Typography>
            <Divider variant={'fullWidth'} />
            {children}
            <Container className={s.buttonStyle} disableGutters>
              <XButton
                onClick={handleClose}
                type="secondary"
                style={{ minWidth: '113px' }}
              >
                Cancel
              </XButton>
              {buttonType === 'send' && (
                <XButton
                  type="primary"
                  style={{ minWidth: '113px' }}
                  onClick={buttonCallback}
                >
                  Send
                </XButton>
              )}
              {buttonType === 'save' && (
                <XButton
                  type="primary"
                  style={{ minWidth: '113px' }}
                  onClick={buttonCallback}
                >
                  Save
                </XButton>
              )}
              {buttonType === 'delete' && (
                <XButton
                  type="delete"
                  style={{ minWidth: '113px' }}
                  onClick={buttonCallback}
                >
                  Delete
                </XButton>
              )}
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
