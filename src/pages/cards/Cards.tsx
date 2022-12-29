import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { getCards, postCard } from '../../features/cards/cards/BLL/cardsThunk'
import { CardsTableControls } from '../../features/cards/cards/VIEW/CardsTableControls'
import { CardsTable } from '../../features/cards/cards/VIEW/CardsTable'
import {
  cardsCurrentPackInfo,
  cardsPendingSelector,
  currentPageSelector,
  maxPageSelector,
} from '../../features/cards/cards/BLL/selectorsCards'
import { TablePagination } from '../../features/cards/common/components/TablePagination'
import { AddEntityButton } from '../../features/cards/common/components/AddEntityButton'
import { userIDSelector } from '../../features/auth/selectorsAuth'
import { useSetHeaderTitle } from '../../hooks/setHeaderTitle'
import { HeaderContext } from '../../context/context'
import { PATH } from '../../data/paths'
import { HoverMenu } from '../../features/learn/UI/hoverMenu/HoverMenu'
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
  const navigate = useNavigate()

  // const buttonCallback = () => {
  //   if (!id) {
  //     return
  //   }
  //   if (isOwner) {
  //     dispatch(
  //       postCard({
  //         postCard: {
  //           cardsPack_id: id,
  //           question: prompt('Question: ') || 'question',
  //           answer: prompt('Answer: ') || 'answer',
  //         },
  //         queries: { ...params, cardsPack_id: id },
  //       })
  //     )
  //   } else {
  //     navigate(`/${PATH.LEARN}/${id}`)
  //   }
  // }

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
