import { AlertManagerContext } from '../components/AlertManager'
import CircularProgress from '@mui/material/CircularProgress'
import GetUsers from '../gql/users.gql'
import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { UsersTable } from '../components/UsersTable'

export const Users = () => {
  const { setOnFailure } = useContext(AlertManagerContext)

  const { loading, error, data = {} } = useQuery(GetUsers)

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    setOnFailure('Failed to load users, please try again later.')
    return
  }

  return (
    <UsersTable data={data.users} />
  )
}
