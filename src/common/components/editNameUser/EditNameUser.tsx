import { TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

type EditNameUserPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditNameUser = ({ value, onChange }: EditNameUserPropsType) => {
  {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditMode = () => {
      setEditMode(true)
      setTitle(value)
    }
    const activateViewMode = () => {
      setEditMode(false)
      onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    return editMode ? (
      <TextField
        value={title}
        onChange={changeTitle}
        autoFocus
        onBlur={activateViewMode}
      />
    ) : (
      <Typography component={'p'} onDoubleClick={activateEditMode}>
        {value}
      </Typography>
    )
  }
}
