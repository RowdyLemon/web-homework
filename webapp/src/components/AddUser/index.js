/* eslint-disable camelcase */
import { ADD_USER, UPDATE_USER } from '../../gql/Mutations'
import AddIcon from '@mui/icons-material/Add'
import { AlertManagerContext } from '../AlertManager'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import { func, shape, string } from 'prop-types'
import GetUsers from '../../gql/users.gql'
import IconButton from '@mui/material/IconButton'
import React, { Fragment, useState, useContext, useEffect } from 'react'
import { TextInputField } from '../TextInputField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useMutation } from '@apollo/client'

export const AddUser = ({ user, setUser }) => {
  const { setOnFailure, setOnSuccess } = useContext(AlertManagerContext)

  const [open, setOpen] = useState(!!user)
  const [firstName, setFirstName] = useState(user?.first_name || '')
  const [lastName, setLastName] = useState(user?.last_name || '')
  const [dob, setDOB] = useState(user?.dob || '')
  const [invalidInput, setInvalidInput] = useState(false)

  useEffect(() => {
    setOpen(!!user)
    setFirstName(user?.first_name || '')
    setLastName(user?.last_name || '')
    setDOB(user?.dob || '')
  }, [user])

  const [addUser] = useMutation(ADD_USER, {
    update: (cache, result) => {
      const newUser = result.data.addUser
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetUsers })))

      data.users.push(newUser)
      cache.writeQuery({
        query: GetUsers,
        data
      })
    },
    onCompleted: () => {
      setOnSuccess('Successfully created user')
      resetState()
    },
    onError: () => setOnFailure('Failed to create user, please try again later')
  })

  const [updateUser] = useMutation(UPDATE_USER, {
    update: (cache, result) => {
      const user = result.data.updateUser
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetUsers })))

      const index = data.users.findIndex(u => u.id === user.id)
      data.users[index] = user
      cache.writeQuery({
        query: GetUsers,
        data
      })
    },
    onCompleted: () => {
      setOnSuccess('Successfully updated user')
      resetState()
    },
    onError: () => setOnFailure('Failed to update user, please try again later')
  })

  const resetState = () => {
    setFirstName('')
    setLastName('')
    setDOB('')
    setInvalidInput(false)
    setOpen(false)
    setUser(null)
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
          <Typography component='h2' sx={{ m: 2 }} variant='h5'>{user ? 'Edit User' : 'Add User'}</Typography>
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

              if (user) {
                updateUser({
                  variables: {
                    id: user.id,
                    first_name: firstName,
                    last_name: lastName,
                    dob
                  }
                })
              } else {
                addUser({
                  variables: {
                    first_name: firstName,
                    last_name: lastName,
                    dob
                  }
                })
              }
            }}
            sx={{ m: 2 }}
            variant='contained'
          >
            {user ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Drawer>
    </Fragment>
  )
}

AddUser.propTypes = {
  user: shape({
    id: string,
    first_name: string,
    last_name: string,
    dob: string
  }),
  setUser: func
}
