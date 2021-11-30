import { AlertManagerContext } from '../components/AlertManager'
import CircularProgress from '@mui/material/CircularProgress'
import React, { Fragment, useContext, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { TxTable } from '../components/transactions/TxTable'
import { AddTransaction } from '../components/AddTransaction'
import { DELETE_TRANSACTION } from '../gql/Mutations'
import Typography from '@mui/material/Typography'

export function Home () {
  const { setOnFailure, setOnSuccess } = useContext(AlertManagerContext)

  const [editTransaction, setEditTransaction] = useState(null)

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    update: (cache, result) => {
      const deletedId = result.data.deleteTransaction.id
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetTransactions })))

      data.transactions = data.transactions.filter(transaction => transaction.id !== deletedId)
      cache.writeQuery({
        query: GetTransactions,
        data
      })
    },
    onCompleted: () => setOnSuccess('Successfully deleted transaction.'),
    onError: () => setOnFailure('Failed to delete transaction, please try again later.')
  })
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
      <Typography component='h1' variant='h4'>Transactions</Typography>
      <AddTransaction setTransaction={setEditTransaction} transaction={editTransaction} />
      <TxTable
        data={data.transactions}
        onDelete={deleteTransaction}
        onEdit={setEditTransaction}
      />
    </Fragment>
  )
}
