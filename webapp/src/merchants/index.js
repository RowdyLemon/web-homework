import { AlertManagerContext } from '../components/AlertManager'
import CircularProgress from '@mui/material/CircularProgress'
import GetMerchants from '../gql/merchants.gql'
import { MerchantsTable } from '../components/MerchantsTable'
import React, { Fragment, useContext } from 'react'
import Typography from '@mui/material/Typography'
import { useQuery } from '@apollo/client'

export const Merchants = () => {
  const { setOnFailure } = useContext(AlertManagerContext)

  const { loading, error, data = {} } = useQuery(GetMerchants)

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    setOnFailure('Failed to load merchants, please try again later.')
    return
  }

  return (
    <Fragment>
      <Typography component='h1' variant='h4'>Merchants</Typography>
      <MerchantsTable data={data.merchants} />
    </Fragment>
  )
}
