import React from 'react'
import { useAppSelector } from '../../../../state/store'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { DebouncedInput } from './SearchInput'
import { IconButton, Typography } from '@mui/material'
import { DoubleSliderWithInputs } from './Slider/DoubleSliderWithInputs'
import { maxCardsInPacksCountSelector } from '../../BLL/selectorsPacks'
import { ownerIDSelector } from '../../../auth/common/selectors/selectorsAuth'
import s from '../../../../assets/styles/TableControls.module.css'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { XButtonGroup } from './ButtonGroup/ButtonGroup'

export const PacksTableControls = () => {
  const userID = useAppSelector(ownerIDSelector)
  const packsMaxCardsCount = useAppSelector(maxCardsInPacksCountSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const updateParams = (
    newParams: { [param: string]: string }[],
    reset: boolean
  ) => {
    const prevParams = reset ? {} : { ...params }
    setSearchParams(
      createSearchParams({ ...prevParams, ...Object.assign({}, ...newParams) }),
      { replace: true }
    )
  }

  const clearParams = () => {
    setSearchParams(createSearchParams({}), { replace: true })
  }
  const activeButton = () => {
    if (params.user_id === userID) {
      return 1
    } else if (params.user_id === undefined || params.user_id === '') {
      return 2
    } else {
      return 0
    }
  }
  return (
    <div className={s.controlWrapper}>
      {/*Search Input*/}
      <div className={s.controlBlock} style={{ flexGrow: 1 }}>
        <Typography>Search by pack name</Typography>
        <DebouncedInput
          onDebouncedChange={(input) =>
            updateParams([{ packName: input }], false)
          }
          value={params.packName}
          placeholder={'Provide your text'}
        />
      </div>

      {/*Button "Me/All"*/}
      <div className={s.controlBlock}>
        <Typography>Show packs cards</Typography>
        <XButtonGroup
          title={['My', 'All']}
          activeButton={activeButton()}
          handleButtonClick={(button) => {
            updateParams([{ user_id: button === 1 ? userID : '' }], true)
          }}
        />
      </div>

      {/*Slider*/}
      <div className={s.controlBlock}>
        <Typography>Number of cards</Typography>
        <DoubleSliderWithInputs
          current={[+params.min, +params.max]}
          border={[0, packsMaxCardsCount]}
          onChangeCommitted={(newParams) => {
            updateParams(newParams, false)
          }}
        />
      </div>

      {/*Clear filter*/}
      <div className={s.controlBlock}>
        <Typography>Clear</Typography>
        <IconButton onClick={clearParams}>
          <FilterAltOffIcon />
        </IconButton>
      </div>
    </div>
  )
}
