import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { Divider } from '@mui/material'
import Container from '@mui/material/Container'
import XButton from '../../common/components/button/XButton'

const style = {
  position: 'absolute' as 'absolute',
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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>

      <Modal
        open={open}
        onClose={handleClose}
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
            Text in a modal
            <IconButton onClick={handleClose} sx={{ padding: '0' }}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Divider variant={'fullWidth'} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Container sx={buttonStyle} disableGutters={true}>
            <XButton style={{ minWidth: '113px' }}>Send</XButton>
            <XButton
              onClick={handleClose}
              type="delete"
              style={{ minWidth: '113px' }}
            >
              Close
            </XButton>
          </Container>
        </Box>
      </Modal>
    </div>
  )
}
