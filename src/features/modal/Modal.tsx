import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { Divider } from '@mui/material'
import Container from '@mui/material/Container'
import XButton from '../../common/components/button/XButton'

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

export function BasicModal(props: BasicModalType) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={titleStyle}
          >
            {props.title}
            <IconButton onClick={props.handleClose} sx={{ padding: '0' }}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Divider variant={'fullWidth'} />
          {props.children}
          <Container sx={buttonStyle} disableGutters={true}>
            <XButton
              onClick={props.handleClose}
              type="secondary"
              style={{ minWidth: '113px' }}
            >
              Cancel
            </XButton>
            {props.buttonType === 'send' && (
              <XButton
                type="primary"
                style={{ minWidth: '113px' }}
                onClick={props.buttonCallback}
              >
                Send
              </XButton>
            )}
            {props.buttonType === 'save' && (
              <XButton
                type="primary"
                style={{ minWidth: '113px' }}
                onClick={props.buttonCallback}
              >
                Save
              </XButton>
            )}
            {props.buttonType === 'delete' && (
              <XButton
                type="delete"
                style={{ minWidth: '113px' }}
                onClick={props.buttonCallback}
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
