import { ADD_USER } from '../../gql/Mutations'
import AddIcon from '@mui/icons-material/Add'
import { AlertManagerContext } from '../AlertManager'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import GetUsers from '../../gql/users.gql'
import IconButton from '@mui/material/IconButton'
import React, { Fragment, useState, useContext } from 'react'
import { TextInputField } from '../TextInputField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useMutation } from '@apollo/client'

export const AddUser = () => {
  const { setOnFailure, setOnSuccess } = useContext(AlertManagerContext)

  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDOB] = useState('')
  const [invalidInput, setInvalidInput] = useState(false)

  const [addUser] = useMutation(ADD_USER, {
    update: (cache, result) => {
      const newUser = result.data.addUser
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetUsers })))

      if (data) {
        data.users.push(newUser)
        cache.writeQuery({
          query: GetUsers,
          data
        })
      }
    },
    onCompleted: () => {
      setOnSuccess('Successfully created user')
      resetState()
    },
    onError: () => setOnFailure('Failed to create user, please try again later')
  })

  const resetState = () => {
    setFirstName('')
    setLastName('')
    setDOB('')
    setInvalidInput(false)
    setOpen(false)
  }

  return (
    <Fragment>
      <Tooltip sx={{ my: 1 }} title='Add User'>
        <IconButton aria-label='Add User' onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        anchor='right'
        onClose={() => resetState()}
        open={open}
      >
        <Box role='presentation' sx={{ width: 300 }}>
          <Typography component='h2' sx={{ m: 2 }} variant='h5'>Add User</Typography>
          <Divider />
          <TextInputField
            error={invalidInput && !firstName}
            label='First Name'
            onChange={event => setFirstName(event.target.value)}
            value={firstName}
          />
          <TextInputField
            error={invalidInput && !lastName}
            label='First Name'
            onChange={event => setLastName(event.target.value)}
            value={lastName}
          />
          <TextInputField
            error={invalidInput && !dob}
            label='Date of Birth'
            onChange={event => setDOB(event.target.value)}
            value={dob}
          />
          <Button
            onClick={() => {
              if (!firstName || !lastName || !dob) {
                setInvalidInput(true)
                return
              }

              addUser({
                variables: {
                  first_name: firstName,
                  last_name: lastName,
                  dob
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
