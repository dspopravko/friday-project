import React from 'react'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import s from './CardsTableControls.module.css'
import { DebouncedInput } from '../../packs/VIEW/Controls/SearchInput'

export const CardsTableControls = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const updateParams = (newParams: Array<{ [param: string]: string }>) =>
    setSearchParams(
      createSearchParams({ ...params, ...Object.assign({}, ...newParams) })
    )

  return (
    <div className={s.controlWrapper}>
      <div className={s.controlBlock} style={{ flexGrow: 1 }}>
        <Typography>Search:</Typography>
        <DebouncedInput
          onDebouncedChange={(input) => updateParams([{ cardQuestion: input }])}
          initialValue={params.packName}
          placeholder={'Search in questions'}
        />
      </div>
    </div>
  )
}