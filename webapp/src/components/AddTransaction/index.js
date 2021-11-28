import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'

import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { OptionSelect } from '../OptionSelect'
import { DescriptionField } from '../DescriptionField'
import { TransactionTypeSelect } from '../TransactionTypeSelect'
import { AmountField } from '../AmountField'
import Button from '@mui/material/Button'

export const AddTransaction = () => {
  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')
  const [description, setDescription] = useState('')
  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [selectedTransactionType, setSelectedTransactionType] = useState('')
  const [amount, setAmount] = useState('')

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
      <OptionSelect label='User' onSelect={event => setSelectedUser(event.target.value)} options={['Lemon', 'Ben', 'Tyler']} selectedOption={selectedUser} />
      <DescriptionField onChange={event => setDescription(event.target.value)} value={description} />
      <OptionSelect label='Merchant' onSelect={event => setSelectedMerchant(event.target.value)} options={['Amazon', 'Walmart', 'Target']} selectedOption={selectedMerchant} />
      <TransactionTypeSelect onChange={event => setSelectedTransactionType(event.target.value)} value={selectedTransactionType} />
      <AmountField onChange={event => setAmount(event.target.value)} value={amount} />
      <Button sx={{ m: 2 }} variant='contained'>Create</Button>
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
