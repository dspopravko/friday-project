import React from 'react'
import { Typography } from '@mui/material'
import { PacksTableControls } from '../../features/cards/packs/VIEW/PacksTableControls'
import { PacksTable } from '../../features/cards/packs/VIEW/Table/PacksTable'

export const Packs = () => {
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
