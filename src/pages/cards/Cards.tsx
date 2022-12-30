import React, { useContext, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { getCards } from '../../features/cards/cards/BLL/cardsThunk'
import { CardsTableControls } from '../../features/cards/cards/VIEW/CardsTableControls'
import { CardsTable } from '../../features/cards/cards/VIEW/CardsTable'
import {
  cardsCurrentPackInfo,
  cardsPendingSelector,
  currentPageSelector,
  maxPageSelector,
} from '../../features/cards/cards/BLL/selectorsCards'
import { TablePagination } from '../../features/cards/common/components/TablePagination'
import { userIDSelector } from '../../features/auth/selectorsAuth'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { HeaderContext } from '../../context/context'
import { cardsSlice } from '../../features/cards/cards/BLL/cardsSlice'
import { ModalNewCard } from '../../features/modal/modal-new-card/ModalNewCard'

export const Cards = () => {
  useSetHeaderTitle('Cards')
  const { setGoBackButtonTitle } = useContext(HeaderContext)
  const pending = useAppSelector(cardsPendingSelector)
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const currentPackInfo = useAppSelector(cardsCurrentPackInfo)
  const currentUserID = useAppSelector(userIDSelector)
  const isOwner = currentPackInfo.packUserId === currentUserID
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(cardsSlice.actions.resetPack())
    setGoBackButtonTitle('Go back to Packs list')
    return () => setGoBackButtonTitle('')
  }, [])
  useEffect(() => {
    id && dispatch(getCards({ cardsPack_id: id, ...params }))
  }, [id, searchParams])

  return (
    <div style={{ marginTop: 60 }}>
      <ModalNewCard
        currentPackInfo={currentPackInfo}
        buttonTitle={isOwner ? 'Add new card' : 'Learn pack'}
        pending={pending}
        id={id}
        isOwner={isOwner}
        params={params}
      />
      {/* <AddEntityButton
        title={currentPackInfo.packName}
        buttonTitle={isOwner ? 'Add new card' : 'Learn pack'}
        buttonCallback={buttonCallback}
        pending={pending}
      > */}
      {/* {isOwner && id && <HoverMenu packID={id} />}
      </AddEntityButton> */}
      <CardsTableControls />
      <CardsTable id={id || ''} />
      <TablePagination
        page={currentPage}
        maxPage={maxPage}
        pageCount={+params.pageCount}
        title={'cards'}
      />
    </div>
  )
}
