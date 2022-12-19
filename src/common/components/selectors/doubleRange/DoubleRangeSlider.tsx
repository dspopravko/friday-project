import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { theme } from '../../../../assets/mui-theme'

type DoubleRangeSliderPropsType = {
  initialValue: number[]
  onChangeCommitted: (values: number[]) => void
  min: number
  max: number
}

export const DoubleRangeSlider = ({
  onChangeCommitted,
  initialValue,
  min,
  max,
}: DoubleRangeSliderPropsType) => {
  const [value, setValue] = React.useState<number[]>(initialValue)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  const onChangeCommittedHandler = (value: number | number[]) => {
    if (Array.isArray(value)) {
      onChangeCommitted(value)
    } else {
      onChangeCommitted([0, value])
    }
  }
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        sx={{
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
        onChangeCommitted={(event, value) => onChangeCommittedHandler(value)}
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  )
}
