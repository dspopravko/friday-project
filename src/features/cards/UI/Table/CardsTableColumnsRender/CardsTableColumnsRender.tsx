import { Rating } from '@mui/material'
import React from 'react'
import { TableDateColumn } from '../../../../../common'
import { CardType } from '../../../API/types'
import s from './CardsTableColumnsRender.module.css'

/**
 * Iterates over columnsPropsNames and overrides default cell and/or header rendering
 * @param cards - memoized data
 * @param sort - setter for query params
 * @param params - actual query params
 * @param columnsPropsNames - keys from cards to be drawn in the table
 */

export const CardsTableColumnsRender = (
  cards: CardType[],
  sort: (newParams: { [param: string]: string }) => void,
  params: unknown,
  columnsPropsNames: string[]
) => {
  return columnsPropsNames.map((key) => {
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
                <div className={s.deckCoverContainer}>
                  <img
                    alt={`image for question: ${e.value}`}
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
                <div className={s.deckCoverContainer}>
                  <img
                    alt={`image for answer: ${e.value}`}
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
