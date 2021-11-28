import AddIcon from '@mui/icons-material/Add'
import { AlertManagerContext } from '../AlertManager'
import CreateTransaction from '../../gql/mutations.gql'
import { AmountField } from '../AmountField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { DescriptionField } from '../DescriptionField'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import GetMerchants from '../../gql/merchants.gql'
import GetTransactions from '../../gql/transactions.gql'
import GetUsers from '../../gql/users.gql'
import IconButton from '@mui/material/IconButton'
import { OptionSelect } from '../OptionSelect'
import React, { useState, useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { TransactionTypeSelect } from '../TransactionTypeSelect'
import Typography from '@mui/material/Typography'
import { useQuery, useMutation } from '@apollo/client'

export const AddTransaction = () => {
  const { setOnFailure, setOnSuccess } = useContext(AlertManagerContext)

  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState({ value: '' })
  const [description, setDescription] = useState('')
  const [selectedMerchant, setSelectedMerchant] = useState({ value: '' })
  const [selectedTransactionType, setSelectedTransactionType] = useState('')
  const [amount, setAmount] = useState('')

  const usersQuery = useQuery(GetUsers)
  const merchantsQuery = useQuery(GetMerchants)

  const resetState = () => {
    setSelectedUser({ value: '' })
    setDescription('')
    setSelectedMerchant({ value: '' })
    setSelectedTransactionType('')
    setAmount('')
    setOpen(false)
  }

  const [createTransaction] = useMutation(CreateTransaction, {
    update: (cache, result) => {
      const newTransaction = result.data.addTransaction
      const transactions = JSON.parse(JSON.stringify(cache.readQuery({ query: GetTransactions })))

      transactions.transactions.push(newTransaction)
      cache.writeQuery({
        query: GetTransactions,
        data: transactions
      })
    },
    onCompleted: () => {
      setOnSuccess('Successfully created transaction')
      resetState()
    },
    onError: () => setOnFailure('Failed to create transaction, please try again later.')
  })

  if (usersQuery.error || merchantsQuery.error) {
    setOnFailure('Failed to fetch data needed to create transactions, please try again later.')
    resetState()
    return
  }

  const toggleDrawer = (open) => {
    setOpen(open)
  }

  const list = () => (
    <Box
      role='presentation'
      sx={{ width: 300 }}
    >
      <Typography component='h2' sx={{ m: 2 }} variant='h5'>Add Transaction</Typography>
      <Divider />
      {usersQuery.loading
        ? <Box sx={{ m: 2 }}><CircularProgress /></Box>
        : (
          <OptionSelect
            label='User'
            onSelect={setSelectedUser}
            options={usersQuery.data.users.map(user => ({ value: `${user.first_name} ${user.last_name}`, id: user.id }))}
            selectedOption={selectedUser.value}
          />
        )
      }
      <DescriptionField onChange={event => setDescription(event.target.value)} value={description} />
      {merchantsQuery.loading
        ? <Box sx={{ m: 2 }}><CircularProgress /></Box>
        : (
          <OptionSelect
            label='Merchant'
            onSelect={setSelectedMerchant}
            options={merchantsQuery.data.merchants.map(merchant => ({ value: merchant.name, id: merchant.id }))}
            selectedOption={selectedMerchant.value}
          />
        )
      }
      <TransactionTypeSelect onChange={event => setSelectedTransactionType(event.target.value)} value={selectedTransactionType} />
      <AmountField onChange={event => setAmount(event.target.value)} value={amount} />
      <Button
        onClick={() => {
          // TODO: handle validation
          createTransaction({
            variables: {
              user_id: selectedUser.id,
              description,
              merchant_id: selectedMerchant.id,
              debit: selectedTransactionType === 'Debit',
              credit: selectedTransactionType === 'Credit',
              amount: parseFloat(amount)
            }
          })
        }}
        sx={{ m: 2 }}
        variant='contained'
      >
        Create
      </Button>
    </Box>
  )

  return (
    <div>
      <Tooltip sx={{ mb: 1 }} title='Add Transaction'>
        <IconButton
          aria-label='Add Transaction'
          onClick={() => toggleDrawer(true)}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor='right'
        onClose={() => toggleDrawer(false)}
        open={open}
      >
        {list()}
      </Drawer>
    </div>
  )
}
