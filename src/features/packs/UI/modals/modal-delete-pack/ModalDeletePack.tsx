import { Typography } from '@mui/material'
import { BasicModal } from '../../../../../common'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../state/store'
import { deletePack } from '../../../BLL/packsThunk'
import { PATH } from '../../../../../data/paths'
import { ownerIDSelector } from '../../../../auth/common/selectors/selectorsAuth'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'

type ModalDeletePackType = {
  open: boolean
  handleClose: () => void
  packId: string
  packName: string | undefined
}

export const ModalDeletePack = ({
  open,
  handleClose,
  packId,
  packName,
}: ModalDeletePackType) => {
  const params = UseSearchParamsObject()
  const userID = useAppSelector(ownerIDSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const deletePackHandler = async () => {
    const action = await dispatch(deletePack({ packID: packId, params }))
    if (deletePack.fulfilled.match(action)) {
      handleClose()
      setTimeout(() => {
        navigate(`/${PATH.PACKS}/?user_id=${userID}`)
      }, 1100)
    }
  }
  return (
    <>
      <BasicModal
        title={'Delete pack'}
        buttonType={'delete'}
        handleClose={handleClose}
        open={open}
        buttonCallback={deletePackHandler}
      >
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Do you really want to remove&nbsp;
          <span style={{ fontWeight: 600 }}>{packName}</span>? All tables will
          be deleted.
        </Typography>
      </BasicModal>
    </>
  )
}
