import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import { Avatar, Menu, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { logout } from '../../../login/BLL/loginThunks'
import { useNavigate } from 'react-router-dom'
import { profileSelector } from '../../../common/selectors/selectorsAuth'
import { XButton } from '../../../../../common'

export const ProfileHeaderButton = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(profileSelector)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMui = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const handleLogout = () => dispatch(logout())

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <XButton
        id="basic-button"
        aria-controls={openMui ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMui ? 'true' : undefined}
        onClick={handleClick}
        type={'transparent'}
      >
        {user.name}
        <Avatar alt={'Foto user'} src={user.avatar} sx={{ ml: 1 }} />
      </XButton>
      <Menu
        id="basic-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={openMui}
        onClick={handleClose}
        sx={{
          transform: 'translate(0, 8px)',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-Button',
        }}
      >
        <MenuItem onClick={() => navigate('profile')}>
          <PersonIcon />
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}
