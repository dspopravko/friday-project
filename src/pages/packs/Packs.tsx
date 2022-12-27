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
import { setTitle } from '../../services/setHeaderTitle'
import { HeaderContext } from '../../context/context'

export const Packs = () => {
  setTitle('Packs')
  const { setGoBackButtonTitle } = useContext(HeaderContext)
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  const addPackHandler = () => {
    dispatch(
      postPack({
        postData: {
          cardsPack: {
            name: prompt('Whats new name?') || 'default',
          },
        },
        params: params,
      })
    )
  }
  useEffect(() => {
    setGoBackButtonTitle('')
  }, [])
  useEffect(() => {
    dispatch(getPacks(params))
  }, [searchParams])
  return (
    <div style={{ marginTop: 60 }}>
      <AddEntityButton
        title={'Packs'}
        buttonTitle={'Add new pack'}
        buttonCallback={addPackHandler}
      />
      <PacksTableControls />
      <PacksTable />
      <TablePagination page={currentPage} maxPage={maxPage} />
    </div>
  )
}
