import React from 'react'
import s from './PacksTableActionButtons.module.css'
import { ModalEditPack } from '../../../modals/modal-edit-pack/ModalEditPack'
import editIcon from '../../../../../../assets/icons/edit.svg'
import deleteIcon from '../../../../../../assets/icons/delete.svg'
import learnIcon from '../../../../../../assets/icons/teach.svg'
import { useModal } from '../../../../../../hooks/useModal'
import { ModalDeletePack } from '../../../modals/modal-delete-pack/ModalDeletePack'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../../../data/paths'

type TableActionButtonsPropsType = {
  isEmpty: boolean
  packId: string
  isOwnUser: boolean
  packName: string
  cardName: string
  packType: boolean
}

export const PacksTableActionButtons = ({
  isEmpty,
  isOwnUser,
  packName,
  packId,
  packType,
}: TableActionButtonsPropsType) => {
  const navigate = useNavigate()
  const learnHandler = () => navigate(`/${PATH.LEARN}/${packId}`)

  const [modal1, toggleModal1] = useModal()
  const [modal2, toggleModal2] = useModal()
  return (
    <div className={s.buttonGroup}>
      <button
        className={isEmpty ? s.buttonInactive : s.button}
        disabled={isEmpty}
        onClick={learnHandler}
      >
        <img alt={'learn'} src={learnIcon} />
      </button>
      {isOwnUser && (
        <>
          <button className={s.button} onClick={toggleModal1}>
            <img alt={'delete'} src={deleteIcon} />
          </button>
          <ModalDeletePack
            open={modal1}
            handleClose={toggleModal1}
            packId={packId}
            packName={packName}
          />
          <button className={s.button} onClick={toggleModal2}>
            <img alt={'Edit'} src={editIcon} />
          </button>
          <ModalEditPack
            open={modal2}
            handleClose={toggleModal2}
            packId={packId}
            packName={packName}
            packType={packType}
          />
        </>
      )}
    </div>
  )
}
