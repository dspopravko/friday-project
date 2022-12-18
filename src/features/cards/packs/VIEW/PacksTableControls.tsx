import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { getPacks } from '../BLL/packsThunk'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { DebouncedInput } from './Controls/SearchInput'
import { Button, ButtonGroup } from '@mui/material'

export const PacksTableControls = () => {
  const userID = useAppSelector((state) => state.profile.user._id)
  const pending = useAppSelector((state) => state.packs.pending)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()

  const onChangeControls = (param: string, value: string) => {
    const a = createSearchParams({ ...params, [param]: value })
    setSearchParams(a)
  }

  useEffect(() => {
    if (!pending) {
      dispatch(getPacks(params))
    }
  }, [searchParams])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        Search:
        <DebouncedInput
          onDebouncedChange={(input) => onChangeControls('packName', input)}
          initialValue={params.packName}
        />
      </div>
      <div>
        Show packs cards
        <ButtonGroup>
          <Button
            color={params.user_id === userID ? 'primary' : 'secondary'}
            onClick={() => {
              onChangeControls('user_id', userID)
            }}
          >
            My
          </Button>
          <Button
            color={params.user_id === userID ? 'secondary' : 'primary'}
            onClick={() => {
              onChangeControls('user_id', '')
            }}
          >
            All
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
