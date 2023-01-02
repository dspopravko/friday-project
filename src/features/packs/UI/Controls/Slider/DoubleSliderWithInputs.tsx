import React, { useEffect, useRef, useState } from 'react'
import { TextField } from '@mui/material'
import { DoubleRangeSlider } from '../../../../../common/selectors/DoubleRange/DoubleRangeSlider'
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
  const isInitialized = useRef(false)
  const [localValue, setLocalValue] = useState({ min: 0, max: 100 })
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  const handleInput = (newParams: { [param: string]: string }[]) => {
    isInitialized.current = true
    setLocalValue({ ...localValue, ...Object.assign({}, ...newParams) })
  }

  //sends debounced position on callback
  useEffect(() => {
    //prevent sending position on the first render
    if (!isInitialized.current) {
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
    if (current[1] > border[1]) {
      setLocalValue({ min: border[0], max: border[1] })
      return
    }
    //set boundaries on initialization
    if (!isNaN(border[1]) && !isInitialized.current) {
      setLocalValue({ ...localValue, max: border[1] })
    }
  }, [border])

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <TextField
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
          sx={{ p: '1px' }}
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
