import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate } from 'react-router-dom'
import teachicon from '../../../../assets/icons/teach.svg'
import deleteicon from '../../../../assets/icons/delete.svg'
import editicon from '../../../../assets/icons/edit.svg'
import { theme } from '../../../../assets/mui-theme'
import { PATH } from '../../../../data/paths'
import { ModalEditPack } from '../../../packs/UI/modals/modal-edit-pack/ModalEditPack'
import { useModal } from '../../../../hooks/useModal'
import { ModalDeletePack } from '../../../packs/UI/modals/modal-delete-pack/ModalDeletePack'

type hoverMenuPropsType = {
  packID: string
  packName: string
  packType: boolean
}

export const PackMenu = ({
  packID,
  packName,
  packType,
}: hoverMenuPropsType) => {
  const navigate = useNavigate()

  const [modal1, toggleModal1] = useModal()
  const [modal2, toggleModal2] = useModal()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMui = Boolean(anchorEl)

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLearn = () => {
    navigate(`/${PATH.LEARN}/${packID}`)
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        sx={{
          margin: '0 0 3px 12px',
          padding: 0,
          minWidth: 2,
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.background.paper,
          },
          outline: '1px solid black',
        }}
        title={'Current pack actions'}
        onClick={handleButtonClick}
      >
        <MoreVertIcon />
      </Button>

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={openMui}
        onClick={handleClose}
        sx={{
          transform: 'translate(-80px, 8px)',
        }}
      >
        <MenuItem
          onClick={(event) => {
            event.stopPropagation()
            !modal1 && toggleModal1()
          }}
        >
          <img alt={'edit'} src={editicon} />
          Edit
          <ModalEditPack
            open={modal1}
            handleClose={toggleModal1}
            packId={packID}
            packName={packName}
            packType={packType}
          />
        </MenuItem>

        <MenuItem
          onClick={(event) => {
            event.stopPropagation()
            !modal2 && toggleModal2()
          }}
        >
          <img alt={'delete'} src={deleteicon} />
          Delete
          <ModalDeletePack
            open={modal2}
            handleClose={toggleModal2}
            packId={packID}
            packName={packName}
          />
        </MenuItem>

        <MenuItem onClick={handleLearn}>
          <img alt={'learn'} src={teachicon} />
          Learn
        </MenuItem>
      </Menu>
    </div>
  )
}
