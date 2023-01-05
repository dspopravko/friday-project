import React, { useEffect } from 'react'
import { DoubleSliderWithInputs } from '../../../packs/UI/Controls/Slider/DoubleSliderWithInputs'
import { DebouncedInput } from '../../../packs/UI/Controls/SearchInput'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../../../state/store'
import { getUsers } from '../../BLL/usersThunk'
import { Typography } from '@mui/material'

export const UsersFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  const updateParams = (newParams: { [param: string]: string }[]) =>
    setSearchParams(
      createSearchParams({ ...params, ...Object.assign({}, ...newParams) }),
      { replace: true }
    )
  // const clearParams = () => {
  //   setSearchParams(createSearchParams({}))
  // }
  useEffect(() => {
    dispatch(getUsers(params))
  }, [searchParams])
  return (
    <div
      style={{
        gap: '20px',
        backgroundColor: '#f3f3f3',
        padding: '10px',
        borderRadius: '12px',
      }}
    >
      <Typography>Search by name</Typography>
      <DebouncedInput
        onDebouncedChange={(input) => updateParams([{ userName: input }])}
        value={params.packName}
        placeholder={'Input name here'}
      />
      <Typography>Search by cards count</Typography>
      <DoubleSliderWithInputs
        current={[+params.min, +params.max]}
        border={[0, 100]}
        onChangeCommitted={updateParams}
      />
    </div>
  )
}
