import React, { useEffect } from 'react'
import { LearnFlow } from '../../features/learn/UI/LearnFlow/LearnFlow'
import { getAllCards } from '../../features/learn/BLL/learnThunk'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { Typography } from '@mui/material'
import { goBackButtonTitles } from '../../layout/Header/Header'
import { useGoBackButton } from '../../hooks/useGoBackButton'

export const Learn = ({ pageCount = 100 }: { pageCount?: number }) => {
  const isLoaded = useAppSelector((state) => state.learn.loaded)
  const packName = useAppSelector((state) => state.learn.packName)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  useGoBackButton(goBackButtonTitles.back)
  useEffect(() => {
    id && dispatch(getAllCards({ cardsPack_id: id, pageCount }))
  }, [id])

  return (
    <div style={{ marginTop: 40 }}>
      {isLoaded && (
        <Typography variant={'h5'} sx={{ marginBottom: 2 }}>
          Learn &quot;{packName}&quot;
        </Typography>
      )}
      {isLoaded && <LearnFlow />}
    </div>
  )
}
