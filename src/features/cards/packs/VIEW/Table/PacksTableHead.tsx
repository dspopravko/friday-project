import React from 'react'
import { PacksType } from '../../BLL/packsSlice'

//оформляем наши данные в колонки для react-tables, библиотека требует данные в виде массива объектов {Header: '', accessor: ''}
//todo: написать решейпер для объекта, и вынести в отдельный файл
export const shapeTableHead = (packs: Array<PacksType>) => {
  const reshapedObj = packs.map((obj) => ({
    //задаём порядок колоннок
    deckCover: obj.deckCover,
    name: obj.name,
    cardsCount: obj.cardsCount,
    updated: obj.updated,
    user_name: obj.user_name,
    _id: obj._id,
  }))
  const a = reshapedObj[0]
    ? Object.keys(reshapedObj[0]).map((key) => {
        // переназначаем дефолтный метод рендера из react-table, чтобы отрисовывалась картинка, а не ссылка
        switch (true) {
          case key === 'deckCover':
            return {
              Header: 'Image',
              accessor: key,
              Cell: ({ value }: { value: string }) => (
                <img
                  alt={'pack_cover'}
                  style={{ width: '50px', height: '50px' }}
                  src={value}
                />
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
              Header: 'Cards count',
              accessor: key,
            }
          case key === 'user_name':
            return {
              Header: 'Created by',
              accessor: key,
            }
          case key === 'updated':
            return {
              Header: 'Last Updated',
              accessor: key,
              Cell: ({ value }: { value: string }) => (
                <>
                  {new Intl.DateTimeFormat('ru-ru', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                  }).format(new Date(value))}
                </>
              ),
            }
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
  console.log(a)
  return a
}
