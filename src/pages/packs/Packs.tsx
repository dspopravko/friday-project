import React, { useEffect } from 'react'
import { useAppDispatch } from '../../state/store'
import { Typography } from '@mui/material'
import { getPacks } from '../../features/cards/packs/BLL/packsThunk'
import { PacksTableContorls } from '../../features/cards/packs/VIEW/PacksTableContorls'
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
        <PacksTableContorls />
        <PacksTable />
      </div>
    </div>
  )
}
