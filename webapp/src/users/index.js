import { AddUser } from '../components/AddUser'
import { AlertManagerContext } from '../components/AlertManager'
import CircularProgress from '@mui/material/CircularProgress'
import { DELETE_USER } from '../gql/Mutations'
import GetUsers from '../gql/users.gql'
import React, { Fragment, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { UsersTable } from '../components/UsersTable'

export const Users = () => {
  const { setOnFailure, setOnSuccess } = useContext(AlertManagerContext)

  const [deleteUser] = useMutation(DELETE_USER, {
    update: (cache, result) => {
      const deletedId = result.data.deleteUser.id
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetUsers })))

      data.users = data.users.filter(user => user.id !== deletedId)
      cache.writeQuery({
        query: GetUsers,
        data
      })
    },
    onCompleted: () => setOnSuccess('Successfully deleted user'),
    onError: () => setOnFailure('Failed to delete user, please try again later')
  })

  const { loading, error, data = {} } = useQuery(GetUsers)

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    setOnFailure('Failed to load users, please try again later.')
    return
  }

  return (
    <Fragment>
      <AddUser />
      <UsersTable data={data.users} onDelete={deleteUser} />
    </Fragment>
  )
}
