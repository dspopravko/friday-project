import React from 'react'
import { PacksType } from '../../BLL/packsSlice'
import cardsBlank from './../../../../../assets/cardsBlank.svg'
import { TableDateColumn } from '../../../common/components/TableDateColumn'

//оформляем наши данные в колонки для react-tables, библиотека требует данные в виде массива объектов {Header: '', accessor: ''}
//todo: написать решейпер для объекта, и вынести в отдельный файл
export const shapeTableHead = (
  packs: Array<PacksType>,
  sort: (newParams: { [param: string]: string }) => void,
  params: unknown
) => {
  const typedParams = params as { sortPacks: string }
  const reshapedObj = packs.map((obj) => ({
    //задаём порядок колоннок
    deckCover: obj.deckCover,
    name: obj.name,
    cardsCount: obj.cardsCount,
    updated: obj.updated,
    user_name: obj.user_name,
    _id: obj._id,
  }))
  return reshapedObj[0]
    ? Object.keys(reshapedObj[0]).map((key) => {
        // переназначаем дефолтный метод рендера из react-table, чтобы отрисовывалась картинка, а не ссылка
        switch (true) {
          case key === 'deckCover':
            return {
              Header: 'Cover',
              accessor: key,
              Cell: ({ value }: { value: string }) => (
                <div style={{ width: '48px', height: '48px' }}>
                  <img
                    alt={'pack_cover'}
                    style={{
                      borderRadius: '20%',
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    src={value || cardsBlank}
                  />
                </div>
              ),
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
                    title={'Sort by cards count'}
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
            return TableDateColumn(params, sort, key)
          case key === '_id':
            // убираем рендер id шки, чтобы её данные по прежнему были в таблице, но не рисовались
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
