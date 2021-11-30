import { ADD_MERCHANT } from '../../gql/Mutations'
import AddIcon from '@mui/icons-material/Add'
import { AlertManagerContext } from '../AlertManager'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import GetMerchants from '../../gql/merchants.gql'
import IconButton from '@mui/material/IconButton'
import React, { Fragment, useContext, useState } from 'react'
import { TextInputField } from '../TextInputField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useMutation } from '@apollo/client'

export const AddMerchant = () => {
  const { setOnFailure, setOnSuccess } = useContext(AlertManagerContext)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [invalidInput, setInvalidInput] = useState(false)

  const [addMerchant] = useMutation(ADD_MERCHANT, {
    update: (cache, result) => {
      const newMerchant = result.data.addMerchant
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetMerchants })))

      data.merchants.push(newMerchant)
      cache.writeQuery({
        query: GetMerchants,
        data
      })
    },
    onCompleted: () => {
      setOnSuccess('Successfully created merchant')
      resetState()
    },
    onError: () => setOnFailure('Failed to create merchant, please try again later')
  })

  const resetState = () => {
    setName('')
    setOpen(false)
    setInvalidInput(false)
  }

  return (
    <Fragment>
      <Tooltip sx={{ my: 1 }} title='Add Merchant'>
        <IconButton aria-label='Add Merchant' onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor='right'
        onClose={resetState}
        open={open}
      >
        <Box role='presentation' sx={{ width: 300 }}>
          <Typography component='h2' sx={{ m: 2 }} variant='h5'>Add Merchant</Typography>
          <Divider />
          <TextInputField
            error={invalidInput && !name}
            label='Name'
            onChange={event => setName(event.target.value)}
            value={name}
          />
          <Button
            onClick={() => {
              if (!name) {
                setInvalidInput(true)
                return
              }

              addMerchant({
                variables: {
                  name
                }
              })
            }}
            sx={{ m: 2 }}
            variant='contained'
          >
            Add
          </Button>
        </Box>
      </Drawer>
    </Fragment>
  )
}
