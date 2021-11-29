import { ADD_TRANSACTIONS } from '../gql/Mutations'
import { AlertManagerContext } from '../components/AlertManager'
import Box from '@mui/material/Box'
import GetTransactions from '../gql/transactions.gql'
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

  const [addTransactions] = useMutation(ADD_TRANSACTIONS, {
    update: (cache, result) => {
      const newTransactions = result.data.addTransactions
      const data = JSON.parse(JSON.stringify(cache.readQuery({ query: GetTransactions })))

      data.transactions = data.transactions.concat(newTransactions)
      cache.writeQuery({
        query: GetTransactions,
        data
      })
    },
    onCompleted: () => setOnSuccess('Successfully uploaded CSV'),
    onError: () => setOnFailure('Failed to upload CSV')
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
          <UserCSVUpload />
        </TabPanel>
        <TabPanel value='2'>
          <MerchantCSVUpload />
        </TabPanel>
        <TabPanel value='3'>
          <TransactionCSVUpload onFileUpload={handleTransactionCSV} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
