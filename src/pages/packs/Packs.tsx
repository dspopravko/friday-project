import React, { useContext, useEffect } from 'react'
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
import { HeaderContext } from '../../context/context'
import { PacksHeader } from '../../features/packs/UI/Header/PacksHeader'

export const Packs = () => {
  useSetHeaderTitle('Packs')
  const { setGoBackButtonTitle } = useContext(HeaderContext)
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setGoBackButtonTitle('')
  }, [])
  useEffect(() => {
    dispatch(getPacks(params))
  }, [searchParams])
  return (
    <div style={{ marginTop: 60 }}>
      <PacksHeader />
      <PacksTableControls />
      <PacksTable />
      <TablePagination
        page={currentPage}
        maxPage={maxPage}
        pageCount={+params.pageCount}
        title={'packs'}
      />
    </div>
  )
}
