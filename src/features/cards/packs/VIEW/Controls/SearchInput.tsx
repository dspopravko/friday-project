import React, { useEffect, useState } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import { SearchSharp } from '@mui/icons-material'

export type DebouncedInputPropsType = {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  spanClassName?: string
  value: string
  placeholder?: string
  onDebouncedChange?: (value: string) => void
}

export const DebouncedInput = ({
  onDebouncedChange,
  onChangeText,
  value,
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
