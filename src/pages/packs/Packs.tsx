import React, { useCallback, useEffect } from 'react'
import { PacksTableControls } from '../../features/packs/UI/Controls/PacksTableControls'
import { PacksTable } from '../../features/packs/UI/Table/PacksTable/PacksTable'
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
import s from './Packs.module.css'
import { packsActions } from '../../features/packs/BLL/packsSlice'
import { getPacks } from '../../features/packs/BLL/packsThunk'

export const Packs = () => {
  useSetHeaderTitle('Packs')
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  useGoBackButton(goBackButtonTitles.none)
  const dispatch = useAppDispatch()

  //state managing
  const resetState = useCallback(() => {
    dispatch(packsActions.resetState())
  }, [searchParams])

  useEffect(() => {
    return () => {
      resetState()
    }
  }, [])

  useEffect(() => {
    dispatch(getPacks(params))
  }, [searchParams])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.2 }}
      className={s.mainContainer}
    >
      <PacksHeader />
      <PacksTableControls />
      <PacksTable
        columnsPropsNames={[
          'deckCover',
          'name',
          'cardsCount',
          'updated',
          'user_name',
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
