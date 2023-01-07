import React, { useState } from 'react'
import { HeaderButtonWithTitle } from '../../../../common'
import { ModalNewPack } from '../modals/modal-new-pack/ModalNewPack'

export const PacksHeader = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <>
      <HeaderButtonWithTitle
        title={'Packs'}
        buttonTitle={'Add new pack'}
        buttonCallback={handleOpen}
      />
      <ModalNewPack open={open} handleClose={handleClose} />
    </>
  )
}
