import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { BasicModal } from '../../../../../common/Modal/Modal'
import { useAppDispatch } from '../../../../../state/store'
import { updateCard } from '../../../BLL/cardsThunk'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'

type ModalEditPackType = {
  open: boolean
  handleClose: () => void
  cardId: string
  packId: string
  question: string
  answer: string
}

export const ModalEditCard = ({
  open,
  handleClose,
  cardId,
  packId,
  question: initQuestion,
  answer: initAnswer,
}: ModalEditPackType) => {
  const params = UseSearchParamsObject()
  const dispatch = useAppDispatch()

  const [answer, setAnswer] = useState(initAnswer || '')
  const answerHandler = (value: string) => setAnswer(value)

  const [question, setQuestion] = useState(initQuestion || '')
  const questionHandler = (value: string) => setQuestion(value)

  const [value, setValue] = useState('text')

  const inputTypeHandleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }
  const editCardHandler = async () => {
    const action = await dispatch(
      updateCard({
        params,
        postCard: {
          _id: cardId,
          question: question,
          answer: answer,
        },
        packId: packId,
      })
    )
    if (updateCard.fulfilled.match(action)) {
      handleClose()
    }
  }

  return (
    <>
      <BasicModal
        title={'Edit card'}
        buttonType="save"
        handleClose={handleClose}
        open={open}
        buttonCallback={editCardHandler}
      >
        <FormControl fullWidth size="small">
          <FormHelperText sx={{ fontSize: '14px', marginLeft: '0' }}>
            Choose a question format
          </FormHelperText>
          <Select
            value={value}
            onChange={inputTypeHandleChange}
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
            onChange={(e) => questionHandler(e.target.value)}
            defaultValue={question}
            variant="standard"
          />
          <TextField
            sx={{ marginBottom: '20px' }}
            label="Answer"
            onChange={(e) => answerHandler(e.target.value)}
            defaultValue={answer}
            variant="standard"
          />
        </FormControl>
      </BasicModal>
    </>
  )
}
