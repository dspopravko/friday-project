import { Rating } from '@mui/material'
import React, { useState } from 'react'
import { CardsType } from '../../../BLL/cardsSlice'
import { TableDateColumn } from '../../../../../common/TableDateColumnWithSort/TableDateColumn'

export const CardsTableColumnsRender = (
  cards: CardsType[],
  sort: (newParams: { [param: string]: string }) => void,
  params: unknown
) => {
  return ['question', 'answer', 'updated', 'grade'].map((key) => {
    switch (true) {
      case key === 'updated':
        return TableDateColumn(params, ['0updated', '1updated'], sort, key)
      case key === 'grade':
        return {
          Header: 'Grade',
          accessor: key,
          Cell: ({ value }: { value: number }) => (
            <>
              <Rating name="read-only" value={value} precision={0.5} readOnly />
            </>
          ),
        }
      case key === 'question':
        return {
          Header: 'Question',
          accessor: key,
          Cell: (e: { value: string; row: { original: any } }) => {
            const [showImage, setShowImage] = useState(true)
            if (showImage) {
              return (
                <div style={{ height: '45px', width: '100px' }}>
                  <img
                    alt={`image for question: ${e.value}`}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    onError={() => setShowImage(false)}
                    src={e.row.original.questionImg}
                  />
                </div>
              )
            } else {
              return <p>{e.value}</p>
            }
          },
        }
      case key === 'answer':
        return {
          Header: 'Answer',
          accessor: key,
          Cell: (e: { value: string; row: { original: any } }) => {
            const [showImage, setShowImage] = useState(true)
            if (showImage) {
              return (
                <div style={{ height: '45px', width: '100px' }}>
                  <img
                    alt={`image for answer: ${e.value}`}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    onError={() => setShowImage(false)}
                    src={e.row.original.answerImg}
                  />
                </div>
              )
            } else {
              return <p>{e.value}</p>
            }
          },
        }
    }
    return { Header: key, accessor: key }
  })
}
