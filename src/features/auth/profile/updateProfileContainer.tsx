import React, { useEffect, useState } from 'react'
import { Avatar, Badge, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { UpdateProfileModal } from './updateProfileModal'
import { useAppSelector } from '../../../state/store'
import { profileSelector } from '../selectorsAuth'

export type LoginData = {
  name?: string
  password: string
  avatar: FileList
}
//это просто оболочка для аватарки, в ней содержится модалка с формой изменения профиля, возможно стоит перенести модалку повыше, в profile
export const UpdateProfileContainer = ({ photo }: { photo: string }) => {
  const { updateSuccess, pending } = useAppSelector(profileSelector)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }
  closeModalOnSuccess(4000, updateSuccess, pending, setOpen)
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
        <UpdateProfileModal
          setOpen={setOpen}
          open={open}
          onClose={handleClose}
        />
        <Avatar alt={'Foto user'} src={photo} sx={{ width: 96, height: 96 }} />
      </Badge>
    </div>
  )
}

function closeModalOnSuccess(
  delay: number,
  success: boolean,
  pending: boolean,
  setOpen: (state: boolean) => void
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (success) {
        setOpen(false)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [pending])
}
