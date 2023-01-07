import { FormControl } from '@mui/material'
import React, { useState } from 'react'
import { BasicModal, MediaInputGroup } from '../../../../../common'
import { postCard } from '../../../BLL/cardsThunk'
import { useAppDispatch } from '../../../../../state/store'
import { UseSearchParamsObject } from '../../../../../hooks/useSearchParamsObject'

type ModalNewCardPropsType = {
  open: boolean
  handleClose: () => void
  id: string
}

export const ModalNewCard = ({
  open,
  handleClose,
  id,
}: ModalNewCardPropsType) => {
  const dispatch = useAppDispatch()
  const params = UseSearchParamsObject()

  const [questionImg, setQuestionImg] = useState<string>('')
  const [answerImg, setAnswerImg] = useState<string>('')

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const [pending, setPending] = useState(false)

  const addCardHandler = async () => {
    setPending(true)
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
    setPending(false)
  }

  return (
    <BasicModal
      title={'Add new card'}
      buttonType={'send'}
      handleClose={handleClose}
      open={open}
      buttonCallback={addCardHandler}
      pending={pending}
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
