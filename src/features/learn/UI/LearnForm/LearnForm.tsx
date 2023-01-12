import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { XButton, XRadio } from '../../../../common'
import { MediaField } from './MediaField'

type LearnFormPropsType = {
  question: string
  questionImg: string
  questionVideo: string
  answer: string
  answerImg: string
  answerVideo: string
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
  question,
  questionImg,
  questionVideo,
  answer,
  answerImg,
  answerVideo,
  handleNext,
}: LearnFormPropsType) => {
  const [grade, setGrade] = useState(0)

  const [hideAnswer, setHideAnswer] = useState(true)
  const handleNextButton = () => {
    if (hideAnswer) {
      setHideAnswer(false)
    } else {
      setHideAnswer(true)
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
        <MediaField
          title={'Question'}
          fieldImg={questionImg}
          fieldText={question}
          fieldVideo={questionVideo}
        />
      </div>
      <div>
        <Accordion
          expanded={!hideAnswer}
          onChange={() => setHideAnswer(!hideAnswer)}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Show answer</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <MediaField
              hidden={hideAnswer}
              title={'Answer'}
              fieldImg={answerImg}
              fieldText={answer}
              fieldVideo={answerVideo}
            />
            <XRadio
              value={grade}
              onChangeOption={(option) => setGrade(option)}
              options={gradeOptions}
            />
            <XButton
              disabled={grade === 0}
              onClick={handleNextButton}
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
    </div>
  )
}
