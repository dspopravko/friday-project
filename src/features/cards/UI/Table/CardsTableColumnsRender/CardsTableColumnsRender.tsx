import { Rating } from '@mui/material'
import React from 'react'
import { CardsType } from '../../../BLL/cardsSlice'
import { TableDateColumn } from '../../../../../common/TableDateColumnWithSort/TableDateColumn'
import s from '../../../../../assets/styles/Table.module.css'

export const CardsTableColumnsRender = (
  cards: CardsType[],
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
            return TableDateColumn(params, ['0updated', '1updated'], sort, key)
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
          case key === 'answer':
            return {
              Header: 'Answer',
              accessor: key,
              Cell: ({ value }: { value: string }) => (
                <span className={s.blur}>{value}</span>
              ),
            }
        }
        return { Header: key, accessor: key }
      })
    : []
}
