import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import teachicon from '../../../../assets/icons/teach.svg'
import deleteicon from '../../../../assets/icons/delete.svg'
import editicon from '../../../../assets/icons/edit.svg'
import { theme } from '../../../../assets/mui-theme'
import { PATH } from '../../../../data/paths'
import { deletePack, updatePack } from '../../../tables/packs/BLL/packsThunk'
import { userIDSelector } from '../../../auth/common/selectors/selectorsAuth'
import { ModalEditPack } from '../../../modal/modal-edit-pack/ModalEditPack'
import { ModalDeleteItem } from '../../../modal/modal-delete-item/ModalDeleteItem'

type hoverMenuPropsType = {
  packID: string
  packName: string
  packType: boolean
  isOwnUser: boolean
}

export const HoverMenu = ({
  packID,
  packName,
  packType,
  isOwnUser,
}: hoverMenuPropsType) => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const userID = useAppSelector(userIDSelector)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMui = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleEdit = () => {
    dispatch(
      updatePack({
        postData: {
          name: prompt('input new title') || 'New title',
          _id: packID,
        },
        params,
      })
    )
  }
  const handleDelete = () => {
    //todo: add modal confirmation
    dispatch(deletePack({ packID, params }))
    setTimeout(() => {
      navigate(`/${PATH.PACKS}/?user_id=${userID}`)
    }, 1500)
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
        onClick={handleClick}
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
          }}
        >
          <ModalEditPack
            isOwnUser={isOwnUser}
            packId={packID}
            packName={packName}
            packType={packType}
            hoverMenu={true}
          />
        </MenuItem>

        <MenuItem
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <ModalDeleteItem
            isOwnUser={isOwnUser}
            packId={packID}
            packName={packName}
            isCard={false}
            cardId={undefined}
            cardName={undefined}
            hoverMenu={true}
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
