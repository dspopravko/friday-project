import React, { useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material'

type MediaFieldPropType = {
  hidden?: boolean
  title: string
  fieldText: string
  fieldImg: string
  fieldVideo: string
}
export const MediaField = ({
  hidden,
  title,
  fieldText,
  fieldImg: fieldImgInit,
  fieldVideo: fieldVideo,
}: MediaFieldPropType) => {
  const [fieldImg, setfieldImg] = useState(fieldImgInit)
  useEffect(() => {
    setfieldImg(fieldImgInit)
  }, [fieldImgInit])

  return (
    <>
      {fieldImg && (
        <Paper
          title={fieldText}
          style={{
            opacity: hidden ? '0' : '1',
            boxSizing: 'border-box',
            width: '100%',
            padding: 6,
            borderRadius: 6,
            marginBottom: 10,
          }}
        >
          <img
            onError={() => setfieldImg('')}
            alt={fieldText}
            style={{ width: '100%', borderRadius: 6 }}
            src={fieldImg}
          />
        </Paper>
      )}

      {!fieldImg && !fieldVideo && (
        <Typography sx={{ opacity: hidden ? '0' : '1', marginBottom: 3 }}>
          <span style={{ fontWeight: '600' }}>{title}: </span>
          {fieldText}
        </Typography>
      )}
    </>
  )
}
