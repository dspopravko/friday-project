import React from 'react'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import s from '../../../../assets/styles/TableControls.module.css'
import { DebouncedInput } from '../../../packs/UI/Controls/SearchInput'

export const CardsTableControls = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const updateParams = (newParams: { [param: string]: string }[]) =>
    setSearchParams(
      createSearchParams({ ...params, ...Object.assign({}, ...newParams) }),
      { replace: true }
    )

  return (
    <div className={s.controlBlock} style={{ flexGrow: 1 }}>
      <Typography>Search:</Typography>
      <DebouncedInput
        onDebouncedChange={(input) => updateParams([{ cardQuestion: input }])}
        value={params.packName}
        placeholder={'Search in questions'}
      />
    </div>
  )
}
