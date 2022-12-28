import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../data/paths'
import { useAppDispatch } from '../../../state/store'
import { CardsGeneralType } from '../../cards/cards/BLL/cardsSlice'
import { postCard } from '../../cards/cards/BLL/cardsThunk'
import { AddEntityButton } from '../../cards/common/components/AddEntityButton'
import { HoverMenu } from '../../learn/UI/hoverMenu/HoverMenu'
import { BasicModal } from '../Modal'

type ModalNewCardType = {
  currentPackInfo: CardsGeneralType
  buttonTitle: 'Add new card' | 'Learn pack'
  pending: boolean
  id: string | undefined
  isOwner: boolean
  params: any
}

export const ModalNewCard = (props: ModalNewCardType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const addCardHandler = async () => {
    if (!props.id) {
      return
    }
    if (props.isOwner) {
      const action = await dispatch(
        postCard({
          postCard: {
            cardsPack_id: props.id,
            question: question,
            answer: answer,
          },
          queries: { ...props.params, cardsPack_id: props.id },
        })
      )
      if (postCard.fulfilled.match(action)) {
        setQuestion('')
        setAnswer('')
        handleClose()
      }
    } else {
      navigate(`/${PATH.LEARN}/${props.id}`)
    }
  }

  return (
    <>
      <AddEntityButton
        title={props.currentPackInfo.packName}
        buttonTitle={props.buttonTitle}
        buttonCallback={handleOpen}
        pending={props.pending}
      >
        {props.isOwner && props.id && <HoverMenu packID={props.id} />}{' '}
      </AddEntityButton>
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
    </>
  )
}
