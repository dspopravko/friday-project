import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { getCards } from '../../features/cards/BLL/cardsThunk'
import { CardsTableControls } from '../../features/cards/UI/Controls/CardsTableControls'
import { CardsTable } from '../../features/cards/UI/Table/CardsTable/CardsTable'
import {
  currentPageSelector,
  maxPageSelector,
} from '../../features/cards/BLL/selectorsCards'
import { TablePagination } from '../../common'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { goBackButtonTitles } from '../../layout/Header/Header'
import { useGoBackButton } from '../../hooks/useGoBackButton'
import { CardsHeader } from '../../features/cards/UI/Header/CardsHeader'
import { cardsActions } from '../../features/cards/BLL/cardsSlice'
import { motion } from 'framer-motion'

export const Cards = () => {
  useSetHeaderTitle('Cards')
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  useGoBackButton(goBackButtonTitles.back)

  useEffect(() => {
    dispatch(cardsActions.resetPack())
  }, [])

  useEffect(() => {
    id && dispatch(getCards({ cardsPack_id: id, ...params }))
  }, [id, searchParams])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.2 }}
      style={{ marginTop: 60, width: '1000px' }}
    >
      <CardsHeader id={id || ''} />
      <CardsTableControls />
      <CardsTable
        columnsPropsNames={['question', 'answer', 'updated', 'grade']}
      />
      <TablePagination
        page={currentPage}
        maxPage={maxPage}
        pageCount={+params.pageCount}
        initPageCount={10}
        title={'cards'}
      />
    </motion.div>
  )
}
