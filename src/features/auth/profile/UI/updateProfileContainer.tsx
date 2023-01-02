import React, { useState } from 'react'
import { Avatar, Badge, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { UpdateProfileModal } from './Modal/updateProfileModal'

export type LoginData = {
  name?: string
  avatar: FileList
}
export const UpdateProfileContainer = ({ photo }: { photo: string }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Badge
        badgeContent={
          <IconButton onClick={handleOpen}>
            <EditIcon />
          </IconButton>
        }
        showZero
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <UpdateProfileModal open={open} onClose={handleClose} />
        <Avatar alt={'Foto user'} src={photo} sx={{ width: 96, height: 96 }} />
      </Badge>
    </div>
  )
}
