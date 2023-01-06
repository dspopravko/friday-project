import React from 'react'
import { IconButton } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ModalEditPack } from '../../../packs/UI/modals/modal-edit-pack/ModalEditPack'
import { useModal } from '../../../../hooks/useModal'
import { ModalDeletePack } from '../../../packs/UI/modals/modal-delete-pack/ModalDeletePack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { ModalNewCard } from '../modals/modal-new-card/ModalNewCard'
import s from './PackMenu.module.css'

type hoverMenuPropsType = {
  packID: string
  packName: string
  packType: boolean
  isOwner: boolean
}

export const PackMenu = ({
  packID,
  packName,
  packType,
  isOwner,
}: hoverMenuPropsType) => {
  const { id } = useParams()

  const [modal1, toggleModal1] = useModal()
  const [modal2, toggleModal2] = useModal()
  const [modal3, toggleModal3] = useModal()

  return (
    <div className={s.packMenuContainer}>
      <IconButton onClick={() => !modal1 && toggleModal1()}>
        <AddCircleIcon />
        <ModalNewCard
          handleClose={toggleModal1}
          id={id || ''}
          isOwner={isOwner}
          open={modal1}
        />
      </IconButton>
      <IconButton onClick={() => !modal2 && toggleModal2()}>
        <DeleteIcon />
        <ModalDeletePack
          open={modal2}
          handleClose={toggleModal2}
          packId={packID}
          packName={packName}
        />
      </IconButton>

      <IconButton onClick={() => !modal3 && toggleModal3()}>
        <EditIcon />
        <ModalEditPack
          open={modal3}
          handleClose={toggleModal3}
          packId={packID}
          packName={packName}
          packType={packType}
        />
      </IconButton>
    </div>
  )
}
