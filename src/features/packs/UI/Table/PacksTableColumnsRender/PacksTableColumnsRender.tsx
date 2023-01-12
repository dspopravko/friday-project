import React, { useState } from 'react'
import { PacksType } from '../../../BLL/packsSlice'
import cardsBlank from '../../../../../assets/cardsBlank.svg'
import { TableDateColumn } from '../../../../../common'
import s from './PacksTableComlumnsRender.module.css'

/**
 * Iterates over columnsPropsNames and overrides default cell and/or header rendering
 * @param packs - memoized data
 * @param sort - setter for query params
 * @param params - actual query params
 * @param columnsPropsNames - keys from packs to be drawn in the table
 */

export const PacksTableColumnsRender = (
  packs: PacksType[],
  sort: (newParams: { [param: string]: string }) => void,
  params: unknown,
  columnsPropsNames: string[]
) => {
  const typedParams = params as { sortPacks: string }
  return columnsPropsNames.map((key) => {
    switch (true) {
      case key === 'deckCover':
        return {
          Header: 'Cover',
          accessor: key,
          Cell: ({ value }: { value: string }) => {
            const [image, setImage] = useState(value)
            return (
              <div className={s.deckCoverContainer}>
                <img
                  alt={'pack_cover'}
                  onError={() => setImage(cardsBlank)}
                  src={image || cardsBlank}
                />
              </div>
            )
          },
        }
      case key === 'name':
        return {
          Header: 'Packs name',
          accessor: key,
        }
      case key === 'cardsCount':
        return {
          Header: () => {
            let sortIcon = String.fromCharCode(10782)
            if (typedParams.sortPacks === '1cardsCount') {
              sortIcon = String.fromCharCode(9650)
            }
            if (typedParams.sortPacks === '0cardsCount') {
              sortIcon = String.fromCharCode(9660)
            }
            return (
              <div
                style={{ cursor: 'pointer' }}
                title={'Sort by tables count'}
                onClick={() => {
                  if (typedParams.sortPacks === '0cardsCount') {
                    sort({ sortPacks: '1cardsCount' })
                  } else {
                    sort({ sortPacks: '0cardsCount' })
                  }
                }}
              >
                Cards count {sortIcon}
              </div>
            )
          },
          accessor: key,
        }
      case key === 'user_name':
        return {
          Header: 'Created by',
          accessor: key,
        }
      case key === 'updated':
        return TableDateColumn(params, ['0updated', '1updated'], sort, key)
    }
    return { Header: key, accessor: key }
  })
}
