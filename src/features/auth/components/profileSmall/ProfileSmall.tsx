import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { Avatar, Menu, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import XButton from '../../../../common/components/button/XButton'
import { logout } from '../../authThunks'
import { useNavigate } from 'react-router-dom'

export const ProfileSmall = () => {
  // const [open, setOpen] = useState(true)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMui = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    dispatch(logout())
  }
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
        onClick={handleClose} //onClose не срабатывает по клику по MenuItem, так что наверное лучше повесить onClick
        sx={{
          transform: 'translate(0, 8px)',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
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

      {/*{open && (*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      position: 'absolute',*/}
      {/*      transform: 'translate(-20px, 46px)',*/}
      {/*      backgroundColor: 'red',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Button*/}
      {/*      variant={'contained'}*/}
      {/*      onClick={() => {*/}
      {/*        dispatch(logout())*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      Logout*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}
