import { Rating } from '@mui/material'
import React from 'react'
import { TableDateColumn } from '../../../../../common'
import { CardType } from '../../../API/types'

export const CardsTableColumnsRender = (
  cards: CardType[],
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
            if (
              e.row.original.questionImg &&
              e.row.original.questionImg.startsWith('data:image')
            ) {
              return (
                <div style={{ height: '45px', width: '100px' }}>
                  <img
                    alt={`image for question: ${e.value}`}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
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
            if (
              e.row.original.answerImg &&
              e.row.original.answerImg.startsWith('data:image')
            ) {
              return (
                <div style={{ height: '45px', width: '100px' }}>
                  <img
                    alt={`image for answer: ${e.value}`}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
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
