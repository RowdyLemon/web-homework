import { ADD_MERCHANTS, ADD_TRANSACTIONS, ADD_USERS } from '../gql/Mutations'
import { AlertManagerContext } from '../components/AlertManager'
import Box from '@mui/material/Box'
import GetMerchants from '../gql/merchants.gql'
import GetTransactions from '../gql/transactions.gql'
import GetUsers from '../gql/users.gql'
import { MerchantCSVUpload } from '../components/MerchantCSVUpload'
import React, { useState, useContext } from 'react'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { TransactionCSVUpload } from '../components/TransactionCSVUpload'
import { useMutation } from '@apollo/client'
import { UserCSVUpload } from '../components/UserCSVUpload'

export const CSVUpload = () => {
  const { setOnFailure, setOnSuccess } = useContext(AlertManagerContext)

  const [value, setValue] = useState('1')

  const [addMerchants] = useMutation(ADD_MERCHANTS, {
    update: (cache, result) => {
      const newMerchants = result.data.addMerchants
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetMerchants })))

      if (data) {
        data.merchants = data.merchants.concat(newMerchants)
        cache.writeQuery({
          query: GetMerchants,
          data
        })
      }
    },
    onCompleted: () => setOnSuccess('Successfully uploaded merchants CSV'),
    onError: () => setOnFailure('Failed to upload merchants CSV')
  })

  const [addTransactions] = useMutation(ADD_TRANSACTIONS, {
    update: (cache, result) => {
      const newTransactions = result.data.addTransactions
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetTransactions })))

      if (data) {
        data.transactions = data.transactions.concat(newTransactions)
        cache.writeQuery({
          query: GetTransactions,
          data
        })
      }
    },
    onCompleted: () => setOnSuccess('Successfully uploaded transactions CSV'),
    onError: () => setOnFailure('Failed to upload transactions CSV')
  })

  const [addUsers] = useMutation(ADD_USERS, {
    update: (cache, result) => {
      const newUsers = result.data.addUsers
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetUsers })))

      if (data) {
        data.users = data.users.concat(newUsers)
        cache.writeQuery({
          query: GetUsers,
          data
        })
      }
    },
    onCompleted: () => setOnSuccess('Successfully uploaded users CSV'),
    onError: () => setOnFailure('Failed to upload users CSV')
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleMerchantCSV = file => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader()

    reader.onload = e => {
      const file = e.target.result
      const lines = file.split(/\r\n|\n/)

      if (lines[0] !== 'name') {
        setOnFailure('The first line of the CSV file must include the field names')
        return
      }
      try {
        const merchants = lines.slice(1).map(line => {
          const input = line.split(',')
          if (input.length !== 1) {
            throw new Error('Each line of the CSV must include all fields')
          }
          return {
            name: input[0]
          }
        })
        addMerchants({
          variables: {
            merchants
          }
        })
      } catch (err) {
        setOnFailure(err.message)
      }
    }

    reader.onerror = () => setOnFailure('Failed to upload CSV file, please try again later.')
    reader.readAsText(file)
  }

  const handleTransactionCSV = file => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader()

    reader.onload = e => {
      const file = e.target.result
      const lines = file.split(/\r\n|\n/)

      if (lines[0] !== 'user_id,description,merchant_id,debit,credit,amount') {
        setOnFailure('The first line of the CSV file must include the field names')
        return
      }
      try {
        const transactions = lines.slice(1).map(line => {
          const input = line.split(',')
          if (input.length !== 6) {
            throw new Error('Each line of the CSV must include all fields')
          }
          return {
            user_id: input[0],
            description: input[1],
            merchant_id: input[2],
            debit: input[3] === 'true',
            credit: input[4] === 'true',
            amount: parseFloat(input[5])
          }
        })
        addTransactions({
          variables: {
            transactions
          }
        })
      } catch (err) {
        setOnFailure(err.message)
      }
    }

    reader.onerror = () => setOnFailure('Failed to upload CSV file, please try again later.')
    reader.readAsText(file)
  }

  const handleUserCSV = file => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader()

    reader.onload = e => {
      const file = e.target.result
      const lines = file.split(/\r\n|\n/)

      if (lines[0] !== 'first_name,last_name,dob') {
        setOnFailure('The first line of the CSV file must include the field names')
        return
      }
      try {
        const users = lines.slice(1).map(line => {
          const input = line.split(',')
          if (input.length !== 3) {
            throw new Error('Each line of the CSV must include all fields')
          }
          return {
            first_name: input[0],
            last_name: input[1],
            dob: input[2]
          }
        })
        addUsers({
          variables: {
            users
          }
        })
      } catch (err) {
        setOnFailure(err.message)
      }
    }

    reader.onerror = () => setOnFailure('Failed to upload CSV file, please try again later.')
    reader.readAsText(file)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList aria-label='lab API tabs example' onChange={handleChange}>
            <Tab label='Users' value='1' />
            <Tab label='Merchants' value='2' />
            <Tab label='Transactions' value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <UserCSVUpload onFileUpload={handleUserCSV} />
        </TabPanel>
        <TabPanel value='2'>
          <MerchantCSVUpload onFileUpload={handleMerchantCSV} />
        </TabPanel>
        <TabPanel value='3'>
          <TransactionCSVUpload onFileUpload={handleTransactionCSV} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
