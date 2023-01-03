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
import { useNavigate } from 'react-router-dom'
import { postCard } from '../../../BLL/cardsThunk'
import { PATH } from '../../../../../data/paths'
import { useAppDispatch } from '../../../../../state/store'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'

type ModalNewCardPropsType = {
  open: boolean
  handleClose: () => void
  id: string
  isOwner: boolean
}

export const ModalNewCard = ({
  open,
  handleClose,
  id,
  isOwner,
}: ModalNewCardPropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = UseSearchParamsObject()

  const [value, setValue] = useState('text')

  const handleChange = (e: SelectChangeEvent) =>
    setValue(e.target.value as string)

  const [question, setQuestion] = useState<string>('')
  const questionHandler = (value: string) => setQuestion(value)

  const [answer, setAnswer] = useState<string>('')
  const answerHandler = (value: string) => setAnswer(value)

  const addCardHandler = async () => {
    if (isOwner) {
      const action = await dispatch(
        postCard({
          postCard: {
            cardsPack_id: id,
            question: question,
            answer: answer,
          },
          queries: { ...params, cardsPack_id: id },
        })
      )
      if (postCard.fulfilled.match(action)) {
        setQuestion('')
        setAnswer('')
        handleClose()
      }
    } else {
      navigate(`/${PATH.LEARN}/${id}`)
    }
  }
  return (
    <BasicModal
      title={'Add new card'}
      buttonType={'send'}
      handleClose={handleClose}
      open={open}
      buttonCallback={addCardHandler}
    >
      <FormControl fullWidth size="small" sx={{ gap: 2 }}>
        <FormHelperText sx={{ fontSize: '14px', marginLeft: '0' }}>
          Choose input format
        </FormHelperText>
        <Select value={value} onChange={handleChange}>
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="image">Image</MenuItem>
        </Select>
        <TextField
          label="Question"
          variant="standard"
          multiline
          value={question}
          onChange={(e) => questionHandler(e.target.value)}
        />
        <TextField
          label="Answer"
          variant="standard"
          multiline
          value={answer}
          onChange={(e) => answerHandler(e.target.value)}
        />
      </FormControl>
    </BasicModal>
  )
}
