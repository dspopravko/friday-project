import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { DoubleRangeSlider } from '../../../../../common'
import s from './DoubleSliderWithInputs.module.css'

type DoubleSliderWithInputsPropsType = {
  current: number[]
  border: number[]
  onChangeCommitted: (newParams: { [param: string]: string }[]) => void
}

export const DoubleSliderWithInputs = ({
  current,
  border,
  onChangeCommitted,
}: DoubleSliderWithInputsPropsType) => {
  const [initialized, setInitialized] = useState(false)
  const [localValue, setLocalValue] = useState({ min: 0, max: 1000 })
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  const handleInput = (newParams: { [param: string]: string }[]) => {
    setInitialized(true)
    setLocalValue({ ...localValue, ...Object.assign({}, ...newParams) })
  }
  //sends debounced position on callback
  useEffect(() => {
    //prevent sending position on the first render
    if (!initialized) {
      return
    }
    timerId && clearTimeout(timerId)
    setTimerId(
      +setTimeout(() => {
        onChangeCommitted([
          { max: localValue.max.toString() },
          { min: localValue.min.toString() },
        ])
      }, 1000)
    )
    return clearTimeout(timerId)
  }, [localValue.min, localValue.max])

  //set slider position if new current values comes in
  useEffect(() => {
    if (!isNaN(current[0]) && !isNaN(current[1])) {
      setLocalValue({ min: current[0], max: current[1] })
    }
  }, [current])

  useEffect(() => {
    //reset current value if out of new boundaries
    if (localValue.max > border[1]) {
      setLocalValue({ min: border[0], max: border[1] })
      return
    }
    //set boundaries on initialization
    if (!isNaN(border[1]) && !initialized) {
      setLocalValue({ min: current[0] || 0, max: border[1] })
    }
  }, [border])
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <TextField
          sx={{
            backgroundColor: 'white',
          }}
          size="small"
          className={s.input}
          name="From"
          type="number"
          value={localValue.min}
          InputProps={{
            inputProps: {
              min: border[0],
              max: border[1],
              style: { padding: '0 0 0 10px', height: 36 },
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
        current={[+localValue.min, +localValue.max]}
        initialValue={[0, 100]}
        border={[0, border[1]]}
      />
      <div>
        <TextField
          sx={{ p: '1px', backgroundColor: 'white' }}
          className={s.input}
          size="small"
          name="To"
          type="number"
          fullWidth
          value={localValue.max}
          InputProps={{
            inputProps: {
              min: border[0],
              max: border[1],
              style: { padding: '0 0 0 10px', height: 36, width: 45 },
            },
          }}
          onChange={(e) => handleInput([{ max: e.target.value }])}
        />
      </div>
    </div>
  )
}
