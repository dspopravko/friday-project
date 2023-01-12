import React, { useEffect, useState } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import { SearchSharp } from '@mui/icons-material'

export type DebouncedInputPropsType = {
  value: string
  onChangeText?: (value: string) => void
  onDebouncedChange?: (value: string) => void
  placeholder?: string
}

export const DebouncedInput = ({
  value,
  onChangeText,
  onDebouncedChange,
  placeholder = 'Search...',
}: DebouncedInputPropsType) => {
  const [timerId, setTimerId] = useState<number | undefined>(undefined)
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    if (value === undefined) {
      setLocalValue('')
    }
  }, [value])

  const onChangeTextCallback = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLocalValue(e.target.value)
    onChangeText?.(e.currentTarget.value)
    if (onDebouncedChange) {
      timerId && clearTimeout(timerId)
      setTimerId(
        +setTimeout(() => {
          onDebouncedChange(e.target.value)
        }, 700)
      )
    }
  }

  return (
    <TextField
      sx={{
        backgroundColor: 'white',
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchSharp sx={{ opacity: '0.5' }} />
          </InputAdornment>
        ),
        inputProps: { style: { padding: 7 } },
      }}
      fullWidth
      onChange={(e) => onChangeTextCallback(e)}
      value={localValue}
      placeholder={placeholder}
    />
  )
}
