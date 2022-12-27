import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import React from 'react'
import { BasicModal } from '../Modal'

export const ModalNewCard = () => {
  const [value, setValue] = React.useState('text')

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }
  return (
    <BasicModal title={'Add new card'} buttonType={'send'}>
      <FormControl fullWidth size="small">
        <FormHelperText sx={{ fontSize: '14px', marginLeft: '0' }}>
          Choose a question format
        </FormHelperText>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
          sx={{
            height: '36px',
            paddingLeft: '12px',
            paddingTop: '8px',
            paddingBottom: '8px',
            marginBottom: '20px',
          }}
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="image">Image</MenuItem>
        </Select>
        <TextField
          sx={{ marginBottom: '20px' }}
          label="Question"
          defaultValue="How This works in JavaScript?"
          variant="standard"
        />
        <TextField
          sx={{ marginBottom: '20px' }}
          label="Answer"
          defaultValue="Name Pack"
          variant="standard"
        />
      </FormControl>
    </BasicModal>
  )
}
