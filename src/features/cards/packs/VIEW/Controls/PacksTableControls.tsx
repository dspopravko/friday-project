import React from 'react'
import { useAppSelector } from '../../../../../state/store'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { DebouncedInput } from './SearchInput'
import { Button, ButtonGroup, Typography } from '@mui/material'
import { DoubleSliderWithInputs } from './Slider/DoubleSliderWithInputs'
import { maxCardsInPacksCountSelector } from '../../../selectorsCards'
import { userIDSelector } from '../../../../auth/selectorsAuth'
import s from './PacksTableControls.module.css'

export const PacksTableControls = () => {
  const userID = useAppSelector(userIDSelector)
  const packsMaxCardsCount = useAppSelector(maxCardsInPacksCountSelector)
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
          onDebouncedChange={(input) => updateParams([{ packName: input }])}
          initialValue={params.packName}
          placeholder={'Provide your text'}
        />
      </div>
      <div className={s.controlBlock}>
        <Typography>Show packs cards</Typography>
        <ButtonGroup className={s.buttonGroup}>
          <Button
            sx={{ width: '87px' }}
            color={params.user_id === userID ? 'primary' : 'secondary'}
            onClick={() => {
              updateParams([{ user_id: userID }])
            }}
          >
            My
          </Button>
          <Button
            sx={{ width: '87px' }}
            color={params.user_id ? 'secondary' : 'primary'}
            onClick={() => {
              updateParams([{ user_id: '' }])
            }}
          >
            All
          </Button>
        </ButtonGroup>
      </div>
      <div className={s.controlBlock}>
        <Typography>Number of cards</Typography>
        <DoubleSliderWithInputs
          border={[0, packsMaxCardsCount]}
          onChangeCommitted={updateParams}
        />
      </div>
    </div>
  )
}
