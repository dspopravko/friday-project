import React, { useState } from 'react'
import { PacksType } from '../../../BLL/packsSlice'
import cardsBlank from '../../../../../assets/cardsBlank.svg'
import { TableDateColumn } from '../../../../../common/TableDateColumnWithSort/TableDateColumn'

export const PacksTableColumnsRender = (
  packs: PacksType[],
  sort: (newParams: { [param: string]: string }) => void,
  params: unknown
) => {
  const typedParams = params as { sortPacks: string }
  const reshapedObj = packs.map((obj) => ({
    //defines order of table columns
    deckCover: obj.deckCover,
    name: obj.name,
    cardsCount: obj.cardsCount,
    updated: obj.updated,
    user_name: obj.user_name,
    _id: obj._id,
  }))
  return reshapedObj[0]
    ? Object.keys(reshapedObj[0]).map((key) => {
        switch (true) {
          case key === 'deckCover':
            return {
              Header: 'Cover',
              accessor: key,
              Cell: ({ value }: { value: string }) => {
                const [image, setImage] = useState(value)
                return (
                  <div style={{ width: '48px', height: '48px' }}>
                    <img
                      alt={'pack_cover'}
                      onError={() => setImage(cardsBlank)}
                      style={{
                        borderRadius: '20%',
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                      src={image || cardsBlank}
                    />
                  </div>
                )
              },
              maxWidth: 70,
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
                      if (typedParams.sortPacks === '1cardsCount') {
                        sort({ sortPacks: '0cardsCount' })
                      } else {
                        sort({ sortPacks: '1cardsCount' })
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
          case key === '_id':
            // render method for id column removed here. this id column data is needed to be aviliable for the table action buttons
            if (key === '_id') {
              return {
                Header: '',
                accessor: key,
                Cell: () => null,
              }
            }
        }
        return { Header: key, accessor: key }
      })
    : []
}
