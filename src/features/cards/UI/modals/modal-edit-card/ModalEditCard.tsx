import { FormControl } from '@mui/material'
import React, { useState } from 'react'
import { BasicModal } from '../../../../../common/Modal/Modal'
import { useAppDispatch } from '../../../../../state/store'
import { updateCard } from '../../../BLL/cardsThunk'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'
import { MediaInputGroup } from '../../../../../common/MediaInputGroup/MediaInputGroup'

type ModalEditPackType = {
  open: boolean
  handleClose: () => void
  cardId: string
  packId: string
  question: string
  questionImg: string
  answer: string
  answerImg: string
}

export const ModalEditCard = ({
  open,
  handleClose,
  cardId,
  packId,
  question: initQuestion,
  questionImg: initQuestionImg,
  answer: initAnswer,
  answerImg: initAnswerImg,
}: ModalEditPackType) => {
  const params = UseSearchParamsObject()
  const dispatch = useAppDispatch()

  const [question, setQuestion] = useState(initQuestion || '')
  const [questionImg, setQuestionImg] = useState(initQuestionImg || '')

  const [answer, setAnswer] = useState(initAnswer || '')
  const [answerImg, setAnswerImg] = useState(initAnswerImg || '')

  const editCardHandler = async () => {
    const action = await dispatch(
      updateCard({
        params,
        postCard: {
          _id: cardId,
          question,
          questionImg,
          answer,
          answerImg,
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
          <MediaInputGroup
            title={'question'}
            inputText={question}
            setInputText={setQuestion}
            inputImage={questionImg}
            setInputImage={setQuestionImg}
          />
          <MediaInputGroup
            title={'answer'}
            inputText={answer}
            setInputText={setAnswer}
            inputImage={answerImg}
            setInputImage={setAnswerImg}
          />
        </FormControl>
      </BasicModal>
    </>
  )
}
