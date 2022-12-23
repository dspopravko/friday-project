import { Rating } from '@mui/material'
import React from 'react'
import { CardsType } from '../BLL/cardsSlice'
import { TableDateColumn } from '../../common/components/TableDateColumn'

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
            return TableDateColumn(params, sort, key)
          case key === 'grade':
            return {
              Header: 'Grade',
              accessor: key,
              Cell: ({ value }: { value: number }) => (
                <>
                  <Rating
                    name="read-only"
                    value={value}
                    precision={0.5}
                    readOnly
                  />
                </>
              ),
            }
        }
        return { Header: key, accessor: key }
      })
    : []
}
