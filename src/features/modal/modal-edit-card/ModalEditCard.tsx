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
import s from './../modal-edit-pack/ModalEditPack.module.css'
import editicon from '../../../assets/icons/edit.svg'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../../state/store'
import { updateCard } from '../../cards/cards/BLL/cardsThunk'

type ModalEditPackType = {
  isOwnUser: boolean
  cardId: string | undefined
  packId: string
  packName: string | undefined
  cardName: string | undefined
  packType: boolean | undefined
  answer: string | undefined
}

export const ModalEditCard = ({
  cardName,
  cardId,
  packId,
  answer: initAnswer,
  isOwnUser,
}: ModalEditPackType) => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [answer, setAnswer] = React.useState<string>(initAnswer || '')
  const answerHandler = (value: string) => {
    setAnswer(value)
  }
  const [question, setQuestion] = React.useState<string>(cardName || '')
  const questionHandler = (value: string) => {
    setQuestion(value)
  }
  const [value, setValue] = React.useState('text')

  const inputTypeHandleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }
  const editCardHandler = async () => {
    if (!cardId) {
      return
    }
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

  const title = 'Edit card'
  return (
    <>
      <button
        className={s.button}
        style={{ visibility: isOwnUser ? 'visible' : 'hidden' }}
        onClick={handleOpen}
      >
        <img alt={'Edit'} src={editicon} />
      </button>
      <BasicModal
        title={title}
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
            labelId="demo-simple-select-label"
            id="demo-simple-select"
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
