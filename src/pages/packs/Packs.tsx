import React, { useEffect } from 'react'
import { PacksTableControls } from '../../features/packs/UI/Controls/PacksTableControls'
import { PacksTable } from '../../features/packs/UI/Table/PacksTable/PacksTable'
import { getPacks } from '../../features/packs/BLL/packsThunk'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { useSearchParams } from 'react-router-dom'
import { TablePagination } from '../../common'
import {
  currentPageSelector,
  maxPageSelector,
} from '../../features/packs/BLL/selectorsPacks'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { PacksHeader } from '../../features/packs/UI/Header/PacksHeader'
import { goBackButtonTitles } from '../../layout/Header/Header'
import { useGoBackButton } from '../../hooks/useGoBackButton'
import { motion } from 'framer-motion'

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.2 }}
      style={{ marginTop: 60, width: '1000px' }}
    >
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
    </motion.div>
  )
}
