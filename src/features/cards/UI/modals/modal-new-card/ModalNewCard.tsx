import { FormControl } from '@mui/material'
import React, { useState } from 'react'
import { BasicModal } from '../../../../../common/Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { postCard } from '../../../BLL/cardsThunk'
import { PATH } from '../../../../../data/paths'
import { useAppDispatch } from '../../../../../state/store'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'
import { MediaInputGroup } from '../../../../../common/MediaInputGroup/MediaInputGroup'

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

  const [questionImg, setQuestionImg] = useState<string>('')
  const [answerImg, setAnswerImg] = useState<string>('')

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const addCardHandler = async () => {
    if (isOwner) {
      const action = await dispatch(
        postCard({
          postCard: {
            cardsPack_id: id,
            question,
            questionImg,
            answer,
            answerImg,
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
      <FormControl fullWidth size="small" sx={{ marginTop: 2, gap: 2 }}>
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
  )
}
