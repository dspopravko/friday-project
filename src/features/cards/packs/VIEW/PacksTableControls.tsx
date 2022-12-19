import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { getPacks } from '../BLL/packsThunk'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { DebouncedInput } from './Controls/SearchInput'
import { Button, ButtonGroup } from '@mui/material'
import { DoubleRangeSlider } from '../../../../common/components/selectors/doubleRange/DoubleRangeSlider'

export const PacksTableControls = () => {
  const userID = useAppSelector((state) => state.profile.user._id)
  const general = useAppSelector((state) => state.packs.packsGeneral)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()

  const onChangeControls = (newParams: Array<{ [param: string]: string }>) => {
    const x = {}
    newParams.forEach((paramObj) => {
      Object.assign(x, paramObj)
    })
    const b = createSearchParams({ ...params, ...x })
    setSearchParams(b)
  }

  useEffect(() => {
    dispatch(getPacks(params))
  }, [searchParams])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        Search:
        <DebouncedInput
          onDebouncedChange={(input) => onChangeControls([{ packName: input }])}
          initialValue={params.packName}
        />
      </div>
      <div>
        Show packs cards
        <ButtonGroup>
          <Button
            color={params.user_id === userID ? 'primary' : 'secondary'}
            onClick={() => {
              onChangeControls([{ user_id: userID }])
            }}
          >
            My
          </Button>
          <Button
            color={params.user_id === userID ? 'secondary' : 'primary'}
            onClick={() => {
              onChangeControls([{ user_id: '' }])
            }}
          >
            All
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <DoubleRangeSlider
          onChangeCommitted={(values) => {
            console.log(values)
            onChangeControls([
              { min: values[0].toString() },
              { max: values[1].toString() },
            ])
          }}
          initialValue={[+params.min || 0, +params.max || 100]}
          min={general.minCardsCount}
          max={general.maxCardsCount}
        />
      </div>
    </div>
  )
}
