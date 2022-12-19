import React from 'react'
import { Typography } from '@mui/material'
import { PacksTableControls } from '../../features/cards/packs/VIEW/Controls/PacksTableControls'
import { PacksTable } from '../../features/cards/packs/VIEW/Table/PacksTable'

export const Packs = () => {
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
