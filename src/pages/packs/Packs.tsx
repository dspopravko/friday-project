import React, { useEffect } from 'react'
import { useAppDispatch } from '../../state/store'
import { Typography } from '@mui/material'
import { getPacks } from '../../features/cards/packs/BLL/packsThunk'
import { PacksTableControls } from '../../features/cards/packs/VIEW/PacksTableControls'
import { PacksTable } from '../../features/cards/packs/VIEW/Table/PacksTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPacks({}))
  }, [])
  return (
    <div>
      <Typography>Packs</Typography>
      <div>
        <PacksTableControls />
        <PacksTable />
      </div>
    </div>
  )
}
