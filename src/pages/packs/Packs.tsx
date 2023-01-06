import React, { useEffect } from 'react'
import { PacksTableControls } from '../../features/packs/UI/Controls/PacksTableControls'
import { PacksTable } from '../../features/packs/UI/Table/PacksTable/PacksTable'
import { getPacks } from '../../features/packs/BLL/packsThunk'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { useSearchParams } from 'react-router-dom'
import { TablePagination } from '../../common/TablePagination/TablePagination'
import {
  currentPageSelector,
  maxPageSelector,
} from '../../features/packs/BLL/selectorsPacks'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { PacksHeader } from '../../features/packs/UI/Header/PacksHeader'
import { goBackButtonTitles } from '../../layout/Header/Header'
import { useGoBackButton } from '../../hooks/useGoBackButton'

export const Packs = () => {
  useSetHeaderTitle('Packs')
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  useGoBackButton(goBackButtonTitles.none)

  useEffect(() => {
    dispatch(getPacks(params))
  }, [searchParams])
  return (
    <div style={{ marginTop: 60 }}>
      <PacksHeader />
      <PacksTableControls />
      <PacksTable
        columnPropsNames={[
          'deckCover',
          'name',
          'cardsCount',
          'updated',
          'user_name',
          '_id',
        ]}
      />
      <TablePagination
        page={currentPage}
        maxPage={maxPage}
        pageCount={+params.pageCount}
        initPageCount={10}
        title={'packs'}
      />
    </div>
  )
}
