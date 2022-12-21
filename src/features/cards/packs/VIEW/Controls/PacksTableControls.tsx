import React from 'react'
import { useAppSelector } from '../../../../../state/store'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { DebouncedInput } from './SearchInput'
import { IconButton, Typography } from '@mui/material'
import { DoubleSliderWithInputs } from './Slider/DoubleSliderWithInputs'
import { maxCardsInPacksCountSelector } from '../../BLL/selectorsPacks'
import { userIDSelector } from '../../../../auth/selectorsAuth'
import s from './PacksTableControls.module.css'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { XButtonGroup } from './ButtonGroup/ButtonGroup'

export const PacksTableControls = () => {
  const userID = useAppSelector(userIDSelector)
  const packsMaxCardsCount = useAppSelector(maxCardsInPacksCountSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const updateParams = (newParams: Array<{ [param: string]: string }>) =>
    setSearchParams(
      createSearchParams({ ...params, ...Object.assign({}, ...newParams) })
    )
  const clearParams = () => {
    setSearchParams(createSearchParams({}))
  }
  const activeButton = () => {
    if (params.user_id === userID) {
      return 1
    }
    if (params.user_id === undefined || params.user_id === '') {
      return 2
    }
    return 0
  }
  return (
    <div className={s.controlWrapper}>
      <div className={s.controlBlock} style={{ flexGrow: 1 }}>
        <Typography>Search</Typography>
        <DebouncedInput
          onDebouncedChange={(input) => updateParams([{ packName: input }])}
          initialValue={params.packName}
          placeholder={'Provide your text'}
        />
      </div>
      <div className={s.controlBlock}>
        <Typography>Show packs cards</Typography>

        <XButtonGroup
          activeButton={activeButton()}
          handleButtonClick={(button) => {
            updateParams([{ user_id: button === 1 ? userID : '' }])
          }}
        />
      </div>
      <div className={s.controlBlock}>
        <Typography>Number of cards</Typography>
        <DoubleSliderWithInputs
          border={[0, packsMaxCardsCount]}
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
