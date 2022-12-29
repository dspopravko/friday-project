import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import React from 'react'
import { BasicModal } from '../Modal'
import s from './ModalEditPack.module.css'
import editicon from '../../../assets/icons/edit.svg'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../../state/store'
import { updateCard } from '../../cards/cards/BLL/cardsThunk'
import { updatePack } from '../../cards/packs/BLL/packsThunk'

type ModalEditPackType = {
  isOwnUser: boolean
  cardId: string | undefined
  packId: string
  packName: string | undefined
  cardName: string | undefined
  isCard: boolean
  packType: boolean | undefined
  answer: string | undefined
}

export const ModalEditPack = (props: ModalEditPackType) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [packName, setPackName] = React.useState<string>(
    props.packName ? props.packName : ''
  )
  const formHandler = (value: string) => {
    setPackName(value)
  }
  const [answer, setAnswer] = React.useState<string>(
    props.answer ? props.answer : ''
  )
  const answerHandler = (value: string) => {
    setAnswer(value)
  }
  const [question, setQuestion] = React.useState<string>(
    props.cardName ? props.cardName : ''
  )
  const questionHandler = (value: string) => {
    setQuestion(value)
  }
  const [packIsPrivate, setPackIsPrivate] = React.useState<boolean>(
    props.packType ? props.packType : true
  )
  const checkboxHandler = (value: boolean) => {
    setPackIsPrivate(value)
  }
  const [value, setValue] = React.useState('text')

  const inputTypeHandleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }
  const editCardHandler = async () => {
    if (props.cardId) {
      const action = await dispatch(
        updateCard({
          params,
          postCard: {
            _id: props.cardId,
            question: question,
            answer: answer,
          },
          packId: props.packId,
        })
      )
      if (updateCard.fulfilled.match(action)) {
        handleClose()
      }
    }
  }
  const editPackHandler = async () => {
    const action = await dispatch(
      updatePack({
        postData: {
          name: packName,
          _id: props.packId,
          private: packIsPrivate,
        },
        params,
      })
    )
    if (updatePack.fulfilled.match(action)) {
      handleClose()
    }
  }
  const title = props.isCard === true ? 'Edit card' : 'Edit pack'
  return (
    <>
      <button
        className={s.button}
        style={{ visibility: props.isOwnUser ? 'visible' : 'hidden' }}
        onClick={handleOpen}
      >
        <img alt={'Edit'} src={editicon} />
      </button>
      <BasicModal
        title={title}
        buttonType="save"
        handleClose={handleClose}
        open={open}
        buttonCallback={props.isCard ? editCardHandler : editPackHandler}
      >
        {!props.isCard && (
          <FormControl fullWidth>
            <TextField
              id="standard-required"
              label="Name Pack"
              value={packName}
              onChange={(e) => formHandler(e.target.value)}
              variant="standard"
              sx={{ marginBottom: '20px', marginTop: '20px' }}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    value={packIsPrivate}
                    onChange={() => checkboxHandler(!packIsPrivate)}
                  />
                }
                label="Private Pack"
              />
            </FormGroup>
          </FormControl>
        )}{' '}
        {props.isCard && (
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
        )}
      </BasicModal>
    </>
  )
}
