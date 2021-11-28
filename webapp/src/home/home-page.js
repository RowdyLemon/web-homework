import { AlertManagerContext } from '../components/AlertManager'
import CircularProgress from '@mui/material/CircularProgress'
import React, { Fragment, useContext } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { TxTable } from '../components/transactions/TxTable'
import { AddTransaction } from '../components/AddTransaction'

export function Home () {
  const { setOnFailure } = useContext(AlertManagerContext)

  const { loading, error, data = {} } = useQuery(GetTransactions)

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    setOnFailure('Failed to load transactions, please try again later.')
    return
  }

  return (
    <Fragment>
      <AddTransaction />
      <TxTable data={data.transactions} />
    </Fragment>
  )
}
