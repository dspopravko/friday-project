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
import { useNavigate, useSearchParams } from 'react-router-dom'
import { postCard } from '../../tables/cards/BLL/cardsThunk'
import { PATH } from '../../../data/paths'
import { useAppDispatch } from '../../../state/store'

type ModalNewCardPropsType = {
  open: boolean
  handleClose: () => void
  id: string | undefined
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
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const [value, setValue] = React.useState('text')

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  const [question, setQuestion] = React.useState<string>('')
  const questionHandler = (value: string) => {
    setQuestion(value)
  }
  const [answer, setAnswer] = React.useState<string>('')
  const answerHandler = (value: string) => {
    setAnswer(value)
  }
  const addCardHandler = async () => {
    if (!id) {
      return
    }
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
          value={question}
          onChange={(e) => questionHandler(e.target.value)}
        />
        <TextField
          sx={{ marginBottom: '20px' }}
          label="Answer"
          defaultValue="Name Pack"
          variant="standard"
          value={answer}
          onChange={(e) => answerHandler(e.target.value)}
        />
      </FormControl>
    </BasicModal>
  )
}
