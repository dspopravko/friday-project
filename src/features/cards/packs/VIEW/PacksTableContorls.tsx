import React from 'react'
import { useAppDispatch } from '../../../../state/store'
import { getPacks } from '../BLL/packsThunk'

export const PacksTableContorls = () => {
  const dispatch = useAppDispatch()
  const onclickHandler = () => dispatch(getPacks({ min: 5 }))
  return (
    <div>
      Controls:
      <button onClick={() => onclickHandler()}>change to min 5</button>
    </div>
  )
}
