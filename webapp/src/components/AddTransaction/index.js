/* eslint-disable camelcase */
import AddIcon from '@mui/icons-material/Add'
import { AlertManagerContext } from '../AlertManager'
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from '../../gql/Mutations'
import { AmountField } from '../AmountField'
import { bool, func, number, shape, string } from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { TextInputField } from '../TextInputField'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import GetMerchants from '../../gql/merchants.gql'
import GetTransactions from '../../gql/transactions.gql'
import GetUsers from '../../gql/users.gql'
import IconButton from '@mui/material/IconButton'
import { OptionSelect } from '../OptionSelect'
import React, { useState, useContext, useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { TransactionTypeSelect } from '../TransactionTypeSelect'
import Typography from '@mui/material/Typography'
import { useQuery, useMutation } from '@apollo/client'

const getTransactionType = transaction => {
  if (transaction?.debit) {
    return 'Debit'
  }
  if (transaction?.credit) {
    return 'Credit'
  }
  return ''
}

export const AddTransaction = ({ transaction, setTransaction }) => {
  const { setOnFailure, setOnSuccess } = useContext(AlertManagerContext)

  const [open, setOpen] = useState(!!transaction)
  const [selectedUserId, setSelectedUserId] = useState(transaction?.user_id)
  const [description, setDescription] = useState(transaction?.description || '')
  const [selectedMerchantId, setSelectedMerchantId] = useState(transaction?.merchant_id)
  const [selectedTransactionType, setSelectedTransactionType] = useState(getTransactionType(transaction))
  const [amount, setAmount] = useState(transaction?.amount || '')
  const [invalidInput, setInvalidInput] = useState(false)

  useEffect(() => {
    setOpen(!!transaction)
    setSelectedUserId(transaction?.user_id)
    setDescription(transaction?.description || '')
    setSelectedMerchantId(transaction?.merchant_id)
    setSelectedTransactionType(getTransactionType(transaction))
    setAmount(transaction?.amount || '')
  }, [transaction])

  const usersQuery = useQuery(GetUsers)
  const merchantsQuery = useQuery(GetMerchants)

  const resetState = () => {
    setSelectedUserId(null)
    setDescription('')
    setSelectedMerchantId(null)
    setSelectedTransactionType('')
    setAmount('')
    setOpen(false)
    setInvalidInput(false)
    setTransaction(null)
  }

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    update: (cache, result) => {
      const newTransaction = result.data.addTransaction
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetTransactions })))

      data.transactions.push(newTransaction)
      cache.writeQuery({
        query: GetTransactions,
        data
      })
    },
    onCompleted: () => {
      setOnSuccess('Successfully created transaction.')
      resetState()
    },
    onError: () => setOnFailure('Failed to create transaction, please try again later.')
  })

  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    update: (cache, result) => {
      const transaction = result.data.updateTransaction
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetTransactions })))

      const index = data.transactions.findIndex(t => t.id === transaction.id)
      data.transactions[index] = transaction
      cache.writeQuery({
        query: GetTransactions,
        data
      })
    },
    onCompleted: () => {
      setOnSuccess('Successfully updated transaction.')
      resetState()
    },
    onError: () => setOnFailure('Failed to update transaction, please try again later.')
  })

  if (usersQuery.error || merchantsQuery.error) {
    setOnFailure('Failed to fetch data needed to create transactions, please try again later.')
    resetState()
    return
  }

  const toggleDrawer = (open) => {
    setOpen(open)
  }

  return (
    <div>
      <Tooltip sx={{ my: 1 }} title='Add Transaction'>
        <IconButton
          aria-label='Add Transaction'
          onClick={() => toggleDrawer(true)}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor='right'
        onClose={() => resetState()}
        open={open}
      >
        <Box
          role='presentation'
          sx={{ width: 300 }}
        >
          <Typography component='h2' sx={{ m: 2 }} variant='h5'>{transaction ? 'Edit Transaction' : 'Add Transaction'}</Typography>
          <Divider />
          {usersQuery.loading
            ? <Box sx={{ m: 2 }}><CircularProgress /></Box>
            : (
              <OptionSelect
                error={invalidInput && !selectedUserId}
                label='User'
                onSelect={setSelectedUserId}
                options={usersQuery.data.users.map(user => ({ value: `${user.first_name} ${user.last_name}`, id: user.id }))}
                selectedOption={selectedUserId}
              />
            )
          }
          <TextInputField
            error={invalidInput && !description}
            label='Description'
            onChange={event => setDescription(event.target.value)}
            value={description}
          />
          {merchantsQuery.loading
            ? <Box sx={{ m: 2 }}><CircularProgress /></Box>
            : (
              <OptionSelect
                error={invalidInput && !selectedMerchantId}
                label='Merchant'
                onSelect={setSelectedMerchantId}
                options={merchantsQuery.data.merchants.map(merchant => ({ value: merchant.name, id: merchant.id }))}
                selectedOption={selectedMerchantId}
              />
            )
          }
          <TransactionTypeSelect
            error={invalidInput && !selectedTransactionType}
            onChange={event => setSelectedTransactionType(event.target.value)}
            value={selectedTransactionType}
          />
          <AmountField
            error={invalidInput && !amount}
            onChange={event => setAmount(event.target.value)}
            value={amount.toString()}
          />
          <Button
            onClick={() => {
              if (!selectedUserId || !description || !selectedMerchantId || !selectedTransactionType || !amount) {
                setInvalidInput(true)
                return
              }

              if (transaction) {
                updateTransaction({
                  variables: {
                    id: transaction.id,
                    user_id: selectedUserId,
                    description,
                    merchant_id: selectedMerchantId,
                    debit: selectedTransactionType === 'Debit',
                    credit: selectedTransactionType === 'Credit',
                    amount: parseFloat(amount)
                  }
                })
              } else {
                createTransaction({
                  variables: {
                    user_id: selectedUserId,
                    description,
                    merchant_id: selectedMerchantId,
                    debit: selectedTransactionType === 'Debit',
                    credit: selectedTransactionType === 'Credit',
                    amount: parseFloat(amount)
                  }
                })
              }
            }}
            sx={{ m: 2 }}
            variant='contained'
          >
            {transaction ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Drawer>
    </div>
  )
}

AddTransaction.propTypes = {
  transaction: shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }),
  setTransaction: func
}
