import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { Divider } from '@mui/material'
import Container from '@mui/material/Container'
import { XButton } from '../'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 395,
  bgcolor: 'background.paper',
  borderRadius: '2px',
  boxShadow: 24,
  p: 4,
  paddingLeft: '24px',
  paddingRight: '24px',
  paddingTop: '0px',
  paddingBottom: '0px',
}

const titleStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '60px',
}
const buttonStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '108px',
}

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
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={titleStyle}
          >
            {title}
            <IconButton onClick={handleClose} sx={{ padding: '0' }}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Divider variant={'fullWidth'} />
          {children}
          <Container sx={buttonStyle} disableGutters>
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
      </Modal>
    </div>
  )
}
