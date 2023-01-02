import React from 'react'

export const TableDateColumn = (
  params: unknown,
  ascDesc: string[],
  sort: (newParams: { [param: string]: string }) => void,
  key: string
) => {
  const typedParams = params as { sortPacks: string }
  return {
    Header: () => {
      let sortIcon = String.fromCharCode(10782)
      if (typedParams.sortPacks === ascDesc[1]) {
        sortIcon = String.fromCharCode(9650)
      }
      if (typedParams.sortPacks === ascDesc[0]) {
        sortIcon = String.fromCharCode(9660)
      }
      return (
        <div
          style={{ cursor: 'pointer' }}
          title={'Sort last updated date'}
          onClick={() => {
            if (typedParams.sortPacks === ascDesc[1]) {
              sort({ sortPacks: ascDesc[0] })
            } else {
              sort({ sortPacks: ascDesc[1] })
            }
          }}
        >
          Last Updated {sortIcon}
        </div>
      )
    },
    accessor: key,
    Cell: ({ value }: { value: string }) => (
      <>
        {new Intl.DateTimeFormat('ru-ru', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(value))}
      </>
    ),
  }
}
