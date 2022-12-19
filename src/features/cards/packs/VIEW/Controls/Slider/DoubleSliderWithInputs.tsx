import React, { useEffect, useRef, useState } from 'react'
import { TextField } from '@mui/material'
import { DoubleRangeSlider } from '../../../../../../common/components/selectors/doubleRange/DoubleRangeSlider'
import s from './DoubleSliderWithInputs.module.css'

type DoubleSliderWithInputsPropsType = {
  border: number[]
  onChangeCommitted: (newParams: Array<{ [param: string]: string }>) => void
}

export const DoubleSliderWithInputs = ({
  border,
  onChangeCommitted,
}: DoubleSliderWithInputsPropsType) => {
  const isInitialized = useRef(false)
  const [params, setParams] = useState({ min: 0, max: 100 })
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  const handleInput = (newParams: Array<{ [param: string]: string }>) => {
    isInitialized.current = true
    const x = {}
    newParams.forEach((paramObj) => {
      Object.assign(x, paramObj)
    })
    setParams({ ...params, ...x })
  }

  useEffect(() => {
    if (!isInitialized.current) {
      return
    }
    timerId && clearTimeout(timerId)
    setTimerId(
      +setTimeout(() => {
        onChangeCommitted([
          { max: params.max.toString() },
          { min: params.min.toString() },
        ])
      }, 1000)
    )
    return clearTimeout(timerId)
  }, [params.min, params.max])

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <TextField
          size="small"
          className={s.input}
          name="From"
          type="number"
          value={params.min}
          InputProps={{
            inputProps: {
              min: border[0],
              max: border[1],
              style: {
                padding: '0 0 0 10px',
                height: 36,
              },
            },
          }}
          onChange={(e) => handleInput([{ min: e.target.value }])}
        />
      </div>

      <DoubleRangeSlider
        onChangeCommitted={(values) => {
          handleInput([
            { min: values[0].toString() },
            { max: values[1].toString() },
          ])
        }}
        current={[+params.min, +params.max]}
        initialValue={[0, 100]}
        border={[0, border[1]]}
      />
      <div>
        <TextField
          sx={{
            p: '1px',
          }}
          className={s.input}
          size="small"
          name="To"
          type="number"
          fullWidth
          value={params.max}
          InputProps={{
            inputProps: {
              min: border[0],
              max: border[1],
              style: {
                padding: '0 0 0 10px',
                height: 36,
                width: 45,
              },
            },
          }}
          onChange={(e) => handleInput([{ max: e.target.value }])}
        />
      </div>
    </div>
  )
}
