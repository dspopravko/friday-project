import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { Typography } from '@mui/material'
import { getPacks } from '../../features/cards/packs/BLL/packsThunk'

export const Packs = () => {
  const { packs } = useAppSelector((state) => state.packs)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPacks({}))
  }, [])
  return (
    <div>
      <Typography>Packs</Typography>
      <div>
        {packs &&
          packs.map((p) => {
            return <div key={p._id}>{p.name}</div>
          })}
      </div>
    </div>
  )
}
