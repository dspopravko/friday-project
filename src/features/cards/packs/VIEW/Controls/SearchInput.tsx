import React, { ReactNode, useState } from 'react'
import { Input } from '@mui/material'

export type DebouncedInputPropsType = {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
  initialValue: string
} & {
  onDebouncedChange?: (value: string) => void
}

export const DebouncedInput: React.FC<DebouncedInputPropsType> = ({
  onChangeText,
  onDebouncedChange,
  initialValue,
}) => {
  const [timerId, setTimerId] = useState<number | undefined>(undefined)
  const [value, setValue] = useState(initialValue)

  const onChangeTextCallback = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(e.target.value)
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

  return <Input onChange={(e) => onChangeTextCallback(e)} value={value} />
}
