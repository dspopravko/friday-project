import React, { useContext, useEffect } from 'react'
import { PacksTableControls } from '../../features/tables/packs/UI/Controls/PacksTableControls'
import { PacksTable } from '../../features/tables/packs/UI/Table/PacksTable'
import { getPacks } from '../../features/tables/packs/BLL/packsThunk'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { useSearchParams } from 'react-router-dom'
import { TablePagination } from '../../features/tables/common/components/TablePagination'
import {
  currentPageSelector,
  maxPageSelector,
} from '../../features/tables/packs/BLL/selectorsPacks'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { HeaderContext } from '../../context/context'
import { ModalNewPack } from '../../features/modal/modal-new-pack/ModalNewPack'

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
      <ModalNewPack />
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
