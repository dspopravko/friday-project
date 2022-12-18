import React, { ReactNode, useState } from 'react'
import { Input } from '@mui/material'

export type DebouncedInputPropsType = {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
  value: string
} & {
  onDebouncedChange?: (value: string) => void
}

export const DebouncedInput: React.FC<DebouncedInputPropsType> = ({
  onChangeText,
  onDebouncedChange,
  value,
}) => {
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  const onChangeTextCallback = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
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
