import React, { useContext, useEffect } from 'react'
import { PacksTableControls } from '../../features/cards/packs/VIEW/Controls/PacksTableControls'
import { PacksTable } from '../../features/cards/packs/VIEW/Table/PacksTable'
import { getPacks, postPack } from '../../features/cards/packs/BLL/packsThunk'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { useSearchParams } from 'react-router-dom'
import { TablePagination } from '../../features/cards/common/components/TablePagination'
import {
  currentPageSelector,
  maxPageSelector,
} from '../../features/cards/packs/BLL/selectorsPacks'
import { AddEntityButton } from '../../features/cards/common/components/AddEntityButton'
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
      <ModalNewPack params={params} />
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
