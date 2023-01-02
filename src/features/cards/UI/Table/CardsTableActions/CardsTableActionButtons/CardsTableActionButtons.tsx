import React from 'react'
import s from './CardsTableActionButtons.module.css'
import editIcon from '../../../../../../assets/icons/edit.svg'
import deleteIcon from '../../../../../../assets/icons/delete.svg'
import { useModal } from '../../../../../../hooks/useModal'
import { ModalDeleteCard } from '../../../modals/modal-delete-card/ModalDeleteCard'
import { ModalEditCard } from '../../../modals/modal-edit-card/ModalEditCard'

type TableActionButtonsPropsType = {
  cardId: string
  packId: string
  question: string
  answer: string
}

export const CardsTableActionButtons = ({
  question,
  cardId,
  packId,
  answer,
}: TableActionButtonsPropsType) => {
  const [modal1, toggleModal1] = useModal()
  const [modal2, toggleModal2] = useModal()
  return (
    <div className={s.buttonGroup}>
      <button className={s.button} onClick={toggleModal1}>
        <img alt={'delete'} src={deleteIcon} />
      </button>
      <ModalDeleteCard
        open={modal1}
        handleClose={toggleModal1}
        cardId={cardId}
        packId={packId}
        question={question}
      />
      <button className={s.button} onClick={toggleModal2}>
        <img alt={'Edit'} src={editIcon} />
      </button>
      <ModalEditCard
        open={modal2}
        handleClose={toggleModal2}
        cardId={cardId}
        packId={packId}
        question={question}
        answer={answer}
      />
    </div>
  )
}
