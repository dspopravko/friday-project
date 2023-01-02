import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { theme } from '../../../assets/mui-theme'

type DoubleRangeSliderPropsType = {
  initialValue: number[]
  onChangeCommitted: (values: number[]) => void
  border: number[]
  current: number[]
}

export const DoubleRangeSlider = ({
  onChangeCommitted,
  current,
  border,
}: DoubleRangeSliderPropsType) => {
  const onChangeCommittedHandler = (value: number | number[]) => {
    if (Array.isArray(value)) {
      onChangeCommitted(value)
    } else {
      onChangeCommitted([0, value])
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 175,
        mr: 1,
        ml: 1,
      }}
    >
      <Slider
        sx={{
          m: 0,
          width: 150,
          color: theme.palette.primary.main,
          '& .MuiSlider-thumb': {
            width: 18,
            height: 18,
            backgroundColor: 'white',
            border: `5px solid ${theme.palette.primary.main}`,
            borderRadius: '50%',
          },
          '& .MuiSlider-rail': {
            backgroundColor: theme.palette.primary.light,
          },
        }}
        value={current}
        min={border[0]}
        max={border[1]}
        onChange={(event, value) => onChangeCommittedHandler(value)}
        valueLabelDisplay="auto"
      />
    </Box>
  )
}
