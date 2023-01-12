import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../state/store'
import { cardsCurrentPack } from '../../BLL/selectorsCards'
import s from './CardsHeader.module.css'
import { UserItem } from '../../../users/UI/Users/UserItem/UserItem'
import { PackMenu } from '../PackMenu/PackMenu'
import { ownerIDSelector } from '../../../auth/common/selectors/selectorsAuth'
import { PATH } from '../../../../data/paths'
import { useNavigate } from 'react-router-dom'
import { userSelector } from '../../../user/BLL/selectorUser'
import { getUser } from '../../../user/BLL/userThunk'
import cardsBlank from './../../../../assets/cardsBlank.svg'
import { createDate } from '../../../../services/formatDateToString'
import { userActions } from '../../../user/BLL/userSlice'

export const CardsHeader = ({ id }: { id: string }) => {
  const currentPack = useAppSelector(cardsCurrentPack)
  const ownerID = useAppSelector(ownerIDSelector)
  const user = useAppSelector(userSelector)
  const isOwner = currentPack.user_id === ownerID
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [image, setImage] = useState(currentPack.deckCover)
  const handleLearn = () => navigate(`/${PATH.LEARN}/${id}`)

  useEffect(() => {
    setImage(currentPack.deckCover)
  }, [currentPack.deckCover])

  useEffect(() => {
    dispatch(userActions.resetState())
    setTimeout(() => {
      currentPack.user_id && dispatch(getUser({ id: currentPack.user_id }))
    }, 1800)
  }, [currentPack.user_id])

  return (
    <div className={s.mainContainer}>
      {/*Pack cover*/}
      <div className={s.block}>
        <div className={s.coverContainer}>
          <img
            alt={'pack cover'}
            onError={() => setImage(cardsBlank)}
            src={image || ''}
          />
        </div>
      </div>
      {/*Pack info*/}
      {currentPack.name && (
        <div className={s.block} style={{ flexGrow: 1 }}>
          <Typography variant={'h5'}>{currentPack.name}</Typography>
          <Typography>Cards: {currentPack.cardsCount}</Typography>
          <Typography>Created: {createDate(currentPack.created)}</Typography>
          <Typography>Updated: {createDate(currentPack.updated)}</Typography>
        </div>
      )}
      {/*Pack owner*/}
      <div className={s.block} style={{ flexGrow: 1 }}>
        <UserItem {...user} />
      </div>
      {/*Pack controls*/}
      <div className={s.block} style={{ justifyContent: 'space-evenly' }}>
        <Button disabled={!currentPack.cardsCount} onClick={handleLearn}>
          Learn pack
        </Button>
        {isOwner && id && (
          <PackMenu
            packID={id}
            packName={currentPack.name}
            packType={currentPack.private}
          />
        )}
      </div>
    </div>
  )
}
