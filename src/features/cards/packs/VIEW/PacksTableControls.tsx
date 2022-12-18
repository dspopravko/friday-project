import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { getPacks } from '../BLL/packsThunk'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { DebouncedInput } from './Controls/SearchInput'
import { cleanPlainObjectFromEmptyKeys } from '../../../../services/cleanPlainObjectFromEmptyKeys'
import { Button, ButtonGroup } from '@mui/material'

export const PacksTableControls = () => {
  const userID = useAppSelector((state) => state.profile.user._id)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const dispatch = useAppDispatch()
  const sendQuery = () => {
    cleanPlainObjectFromEmptyKeys(params) //мутебельно чистит params от пустых ключей
    dispatch(getPacks(params))
  }

  const onChangeControls = (param: string, value: string) => {
    const a = createSearchParams({ ...params, [param]: value })
    setSearchParams(a)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        Search:
        <DebouncedInput
          onChangeText={(input) => {
            onChangeControls('packName', input)
          }}
          onDebouncedChange={sendQuery}
          value={params.packName || ''}
        />
      </div>
      <div>
        Show packs cards
        <ButtonGroup>
          <Button
            color={params.user_id === userID ? 'primary' : 'secondary'}
            onClick={() => {
              onChangeControls('user_id', userID)
              sendQuery()
            }}
          >
            My
          </Button>
          <Button
            color={params.user_id === userID ? 'secondary' : 'primary'}
            onClick={() => {
              onChangeControls('user_id', '')
              sendQuery()
            }}
          >
            All
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
