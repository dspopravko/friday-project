import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { Avatar, Button, Grid, Menu, MenuItem, Typography } from '@mui/material'
import { logout } from '../../features/auth/authSlice'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'

export const ProfileSmall = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMui = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    dispatch(logout())
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        id="basic-button"
        aria-controls={openMui ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMui ? 'true' : undefined}
        onClick={handleClick}
      >
        {user.name}
        <Avatar alt={'Foto user'} src={user.avatar} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMui}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <PersonIcon />
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>

      {open && (
        <div
          style={{ position: 'absolute', transform: 'translate(-20px, 46px)' }}
        >
          <Button variant={'contained'} onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
