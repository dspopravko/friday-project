import React, { useEffect } from 'react'
import { Typography } from '@mui/material'
import { PacksTableControls } from '../../features/cards/packs/VIEW/Controls/PacksTableControls'
import { PacksTable } from '../../features/cards/packs/VIEW/Table/PacksTable'
import { getPacks } from '../../features/cards/packs/BLL/packsThunk'
import { useAppDispatch } from '../../state/store'
import { useSearchParams } from 'react-router-dom'

export const Packs = () => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPacks(params))
  }, [searchParams])
  return (
    <div style={{ marginTop: 40 }}>
      <Typography>Packs</Typography>
      <div>
        <PacksTableControls />
        <PacksTable />
      </div>
    </div>
  )
}
