import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { CardsType } from '../../../cards/cards/BLL/cardsSlice'
import { learnSlice } from '../../BLL/learnSlice'
import { LinearProgress, Paper } from '@mui/material'
import { setGrade } from '../../BLL/learnThunk'
import { LearnForm } from '../LearnForm/LearnForm'
import { SuccessBig } from '../../../auth/common/components/successBig'
import { PATH } from '../../../../data/paths'
import DoneAllIcon from '@mui/icons-material/DoneAll'

export const LearnFlow = () => {
  const cards = useAppSelector((state) => state.learn.cards)
  const isCompleted = useAppSelector((state) => state.learn.isCompleted)
  const [cardsLeft, setCardsLeft] = useState(0)
  const [total, setTotal] = useState<number | null>(null)
  const [currentCard, setCurrentCard] = useState<CardsType | null>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setCurrentCard(getRandomCard())
    return () => {
      dispatch(learnSlice.actions.resetSlice())
    }
  }, [])
  useEffect(() => {
    setCardsLeft(cards.length)
    if (total) {
      return
    } else if (cards.length) {
      setTotal(cards.length)
    }
  }, [cards])
  const handleFeedback = (grade: number) => {
    if (!currentCard) {
      return
    }
    if (grade >= 5) {
      dispatch(learnSlice.actions.removeCard({ cardId: currentCard._id }))
    }
    dispatch(setGrade({ grade, card_id: currentCard._id }))
  }
  const handleNext = (grade: number) => {
    if (currentCard) {
      handleFeedback(grade)
      setCurrentCard(getRandomCard())
    }
  }
  const getRandomCard = () => {
    const remainCards = cards.filter((card) => card._id !== currentCard?._id)
    if (remainCards.length === 0) {
      dispatch(learnSlice.actions.learnCompleted())
      return currentCard
    }
    let filtredCards: CardsType[]
    for (let i = 1; i < 6; i++) {
      filtredCards = remainCards.filter((card) => card.grade < i)
      if (filtredCards[0]) {
        return filtredCards[Math.floor(Math.random() * filtredCards.length)]
      }
    }
    return currentCard
  }
  const normalise = () => {
    if (total && cardsLeft) {
      return ((total - cardsLeft) * 100) / total
    } else {
      return 0
    }
  }
  return (
    <>
      {!isCompleted && (
        <LinearProgress variant="determinate" value={normalise()} />
      )}
      <Paper
        sx={{
          width: 439,
          minHeight: 490,
        }}
      >
        {currentCard && !isCompleted && (
          <LearnForm
            question={currentCard.question}
            answer={currentCard.answer}
            handleNext={handleNext}
          />
        )}
        {isCompleted && (
          <SuccessBig
            title={'You have successfully learned all the cards!'}
            email={''}
            description={'👇'}
            GoTo={{
              title: 'Go to packs',
              path: '/' + PATH.PACKS,
            }}
          >
            <DoneAllIcon />
          </SuccessBig>
        )}
      </Paper>
    </>
  )
}
