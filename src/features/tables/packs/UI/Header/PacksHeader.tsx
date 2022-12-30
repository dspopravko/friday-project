import React from 'react'
import { AddEntityButton } from '../../../common/components/AddEntityButton'
import { ModalNewPack } from '../../../../modal/modal-new-pack/ModalNewPack'

export const PacksHeader = () => {
  const [open, setOpen] = React.useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <>
      <AddEntityButton
        title={'Packs'}
        buttonTitle={'Add new pack'}
        buttonCallback={handleOpen}
      />
      <ModalNewPack open={open} handleClose={handleClose} />
    </>
  )
}
