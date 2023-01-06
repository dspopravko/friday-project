import React, { useEffect } from 'react'
import { DoubleSliderWithInputs } from '../../../packs/UI/Controls/Slider/DoubleSliderWithInputs'
import { DebouncedInput } from '../../../packs/UI/Controls/SearchInput'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../../../state/store'
import { getUsers } from '../../BLL/usersThunk'
import { IconButton, Typography } from '@mui/material'
import s from './UsersFilter.module.css'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

export const UsersFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  const updateParams = (newParams: { [param: string]: string }[]) =>
    setSearchParams(
      createSearchParams({ ...params, ...Object.assign({}, ...newParams) }),
      { replace: true }
    )
  const clearParams = () => {
    setSearchParams(createSearchParams({}), { replace: true })
  }
  useEffect(() => {
    dispatch(getUsers(params))
  }, [searchParams])
  return (
    <div className={s.usersFilterContainer}>
      <div className={s.controlBlock}>
        <Typography>Search by name</Typography>
        <DebouncedInput
          onDebouncedChange={(input) => updateParams([{ userName: input }])}
          value={params.userName}
          placeholder={'Input name here'}
        />
      </div>
      <div className={s.controlBlock}>
        <Typography>Search by cards count</Typography>
        <DoubleSliderWithInputs
          current={[+params.min, +params.max]}
          border={[0, 100]}
          onChangeCommitted={updateParams}
        />
      </div>
      <div className={s.controlBlock}>
        <Typography>Clear</Typography>
        <IconButton onClick={clearParams}>
          <FilterAltOffIcon />
        </IconButton>
      </div>
    </div>
  )
}
