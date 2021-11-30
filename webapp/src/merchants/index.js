import { AlertManagerContext } from '../components/AlertManager'
import CircularProgress from '@mui/material/CircularProgress'
import { DELETE_MERCHANT } from '../gql/Mutations'
import GetMerchants from '../gql/merchants.gql'
import { MerchantsTable } from '../components/MerchantsTable'
import React, { Fragment, useContext } from 'react'
import Typography from '@mui/material/Typography'
import { useQuery, useMutation } from '@apollo/client'

export const Merchants = () => {
  const { setOnFailure, setOnSuccess } = useContext(AlertManagerContext)

  const [deleteMerchant] = useMutation(DELETE_MERCHANT, {
    update: (cache, result) => {
      const deletedId = result.data.deleteMerchant.id
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetMerchants })))

      data.merchants = data.merchants.filter(merchant => merchant.id !== deletedId)
      cache.writeQuery({
        query: GetMerchants,
        data
      })
    },
    onCompleted: () => setOnSuccess('Successfully deleted merchant'),
    onError: () => setOnFailure('Failed to delete merchant, please try again later')
  })

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
      <MerchantsTable data={data.merchants} onDelete={deleteMerchant} />
    </Fragment>
  )
}
