import React from 'react'
import { CardsType } from '../BLL/cardsSlice'

export const shapeTableHead = (
  cards: Array<CardsType>,
  sort: (newParams: { [param: string]: string }) => void,
  params: unknown
) => {
  const reshapedObj = cards.map((obj) => ({
    question: obj.question,
    answer: obj.answer,
    updated: obj.updated,
    grade: obj.grade,
  }))
  return reshapedObj[0]
    ? Object.keys(reshapedObj[0]).map((key) => {
        switch (true) {
          case key === 'updated':
            return {
              Header: 'Last Updated',
              accessor: key,
            }
        }
        return { Header: key, accessor: key }
      })
    : []
}
