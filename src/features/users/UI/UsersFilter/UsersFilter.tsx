import React from 'react'
import { DoubleSliderWithInputs } from '../../../packs/UI/Controls/Slider/DoubleSliderWithInputs'
import { DebouncedInput } from '../../../packs/UI/Controls/SearchInput'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../../../state/store'
import { IconButton, Typography } from '@mui/material'
import s from './UsersFilter.module.css'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { XSelect } from '../../../../common'
import { usersCurrentPage } from '../../BLL/selectorsUsers'

const usersSortOptions = [
  { id: 0, value: 'none', param: '' },
  { id: 1, value: 'From high to low', param: '0publicCardPacksCount' },
  { id: 2, value: 'From low to high', param: '1publicCardPacksCount' },
]

export const UsersFilter = () => {
  const usersPage = useAppSelector(usersCurrentPage)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const updateParams = (newParams: { [param: string]: string }[]) =>
    setSearchParams(
      createSearchParams({ ...params, ...Object.assign({}, ...newParams) }),
      { replace: true }
    )

  const clearParams = () => {
    setSearchParams(createSearchParams({}), { replace: true })
  }

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
        <Typography>Search by packs count</Typography>
        <DoubleSliderWithInputs
          current={[+params.min, +params.max]}
          border={[0, usersPage.maxPublicCardPacksCount]}
          onChangeCommitted={updateParams}
        />
      </div>
      <div className={s.controlBlock}>
        <Typography>Sort by packs count</Typography>
        <XSelect
          value={
            usersSortOptions.find((o) => o.param === params.sortUsers)?.id || 0
          }
          onChangeOption={(option: number) =>
            updateParams([{ sortUsers: usersSortOptions[option - 1].param }])
          }
          options={usersSortOptions}
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
