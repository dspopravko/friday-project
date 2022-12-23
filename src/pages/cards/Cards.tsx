import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { getCards, postCard } from '../../features/cards/cards/BLL/cardsThunk'
import { CardsTableControls } from '../../features/cards/cards/VIEW/CardsTableControls'
import { CardsTable } from '../../features/cards/cards/VIEW/CardsTable'
import {
  cardsAuthorUserName,
  cardsCurrentPackInfo,
  currentPageSelector,
  maxPageSelector,
} from '../../features/cards/cards/BLL/selectorsCards'
import { TablePagination } from '../../features/cards/common/components/TablePagination'
import { AddEntityButton } from '../../features/cards/common/components/AddEntityButton'
import { userIDSelector } from '../../features/auth/selectorsAuth'

export const Cards = () => {
  const currentPage = useAppSelector(currentPageSelector)
  const maxPage = useAppSelector(maxPageSelector)
  const authorUserName = useAppSelector(cardsAuthorUserName)
  const currentPackInfo = useAppSelector(cardsCurrentPackInfo)
  const currentUserID = useAppSelector(userIDSelector)
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  useEffect(() => {
    id && dispatch(getCards({ cardsPack_id: id, ...params }))
  }, [id, searchParams])

  return (
    <div style={{ marginTop: 60 }}>
      <AddEntityButton
        title={(() => {
          if (currentPackInfo.packUserId === currentUserID) {
            return 'My Pack'
          } else if (authorUserName === 'Friend') {
            return "Friend's Pack"
          } else {
            return `${authorUserName}'s pack`
          }
        })()}
        ButtonTitle={'Add new card'}
        ButtonCallback={() => {
          if (!id) {
            return
          }
          dispatch(
            postCard({
              postCard: {
                cardsPack_id: id,
                question: prompt('Question: ') || 'question',
                answer: prompt('Answer: ') || 'answer',
              },
              queries: { ...params, cardsPack_id: id },
            })
          )
        }}
      />
      <CardsTableControls />
      <CardsTable id={id || ''} />
      <TablePagination page={currentPage} maxPage={maxPage} />
    </div>
  )
}
