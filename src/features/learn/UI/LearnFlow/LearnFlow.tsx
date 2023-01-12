import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { LinearProgress, Paper } from '@mui/material'
import { setGrade } from '../../BLL/learnThunk'
import { LearnForm } from '../LearnForm/LearnForm'
import { SuccessBig } from '../../../auth/common/components/successBig'
import { PATH } from '../../../../data/paths'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { CardType } from '../../../cards/API/types'
import { learnActions } from '../../BLL/learnSlice'
import { motion } from 'framer-motion'

export const LearnFlow = () => {
  const cards = useAppSelector((state) => state.learn.cards)
  const isCompleted = useAppSelector((state) => state.learn.isCompleted)
  const [cardsLeft, setCardsLeft] = useState(0)
  const [total, setTotal] = useState<number | null>(null)
  const [currentCard, setCurrentCard] = useState<CardType | null>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setCurrentCard(getRandomCard())
    return () => {
      dispatch(learnActions.resetSlice())
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
      dispatch(learnActions.removeCard({ cardId: currentCard._id }))
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
      dispatch(learnActions.learnCompleted())
      return currentCard
    }
    let filtredCards: CardType[]
    for (let i = 1; i < 6; i++) {
      filtredCards = remainCards.filter((card) => card.grade <= i)
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
    <motion.div
      initial={{x: 100, opacity: 0}}
      animate={{x: 0,opacity: 1}}
      transition={{delay: 0, duration: 0.2}}
    >
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
            questionImg={currentCard.questionImg}
            questionVideo={currentCard.questionVideo}
            answer={currentCard.answer}
            answerImg={currentCard.answerImg}
            answerVideo={currentCard.answerVideo}
            handleNext={handleNext}
          />
        )}
        {isCompleted && (
          <SuccessBig
            title={'You have successfully learned all the tables!'}
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
    </motion.div>
  )
}
