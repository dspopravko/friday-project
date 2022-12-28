import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import XButton from '../../../../common/components/button/XButton'
import XRadio from '../../../../common/components/radio/XRadio'

type LearnFormPropsType = {
  question: string
  answer: string
  handleNext: (grade: number) => void
}

export const gradeOptions = [
  { id: 1, value: 'Did not know' },
  { id: 2, value: 'Forgot' },
  { id: 3, value: 'A lot of thought' },
  { id: 4, value: 'Confused' },
  { id: 5, value: 'Knew the answer' },
]

export const LearnForm = ({
  handleNext,
  answer,
  question,
}: LearnFormPropsType) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [grade, setGrade] = useState(0)
  const handleButton = () => {
    if (!showAnswer) {
      setShowAnswer(true)
    } else {
      setShowAnswer(false)
      handleNext(grade)
      setGrade(0)
    }
  }

  return (
    <div
      style={{
        textAlign: 'left',
        padding: '30px 33px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div>
        <Typography sx={{ marginBottom: 3 }}>
          <span style={{ fontWeight: '600' }}>Question: </span>
          {question}
        </Typography>
      </div>
      <div>
        <Accordion
          expanded={showAnswer}
          onChange={() => setShowAnswer(!showAnswer)}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Show answer</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <Typography style={{ opacity: showAnswer ? '1' : '0' }}>
              <span style={{ fontWeight: '600' }}>Answer: </span>
              {answer}
            </Typography>
            <XRadio
              value={grade}
              onChangeOption={(option) => setGrade(option)}
              options={gradeOptions}
            />
            <XButton
              disabled={grade === 0}
              onClick={handleButton}
              sx={{
                marginTop: '20px',
                width: '100%',
              }}
            >
              Next question
            </XButton>
          </AccordionDetails>
        </Accordion>
      </div>
      <div></div>
    </div>
  )
}
