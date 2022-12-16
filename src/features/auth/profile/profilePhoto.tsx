import React, { useState } from 'react'
import { Avatar, Badge, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAppSelector } from '../../../state/store'
import { UpdateProfileModal } from './updateProfileModal'

export type LoginData = {
  name?: string
  password: string
  avatar: FileList
}
//это просто оболочка для аватарки, в ней содержится модалка с формой изменения профиля, возможно стоит перенести модалку повыше, в profile
export const ProfilePhoto = () => {
  const user = useAppSelector((state) => state.auth.user)
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
        <UpdateProfileModal setOpen={setOpen} open={open} onClose={handleClose} />
        <Avatar
          alt={'Foto user'}
          src={user.avatar}
          sx={{ width: 96, height: 96 }}
        />
      </Badge>
    </div>
  )
}
