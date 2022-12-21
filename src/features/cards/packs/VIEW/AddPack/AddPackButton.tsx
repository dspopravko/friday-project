import React from 'react'
import { Button, Typography } from '@mui/material'
import { postPack } from '../../BLL/packsThunk'
import { useAppDispatch } from '../../../../../state/store'
import { useSearchParams } from 'react-router-dom'

export const AddPackButton = () => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
        margin: '0 auto',
      }}
    >
      <Typography variant={'h5'}>Packs</Typography>
      <Button
        onClick={() => {
          dispatch(
            postPack({
              postData: { name: 'Castrol', cardsPack: [] },
              params: params,
            })
          )
        }}
      >
        Add new pack
      </Button>
    </div>
  )
}
