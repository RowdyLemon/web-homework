import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { func } from 'prop-types'
import Paper from '@mui/material/Paper'
import React, { Fragment } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

export const TransactionCSVUpload = ({ onFileUpload }) => {
  return (
    <Fragment>
      <label htmlFor='upload-transaction-csv'>
        <input
          accept='.csv'
          data-testid='upload-transaction-csv'
          id='upload-transaction-csv'
          name='upload-transaction-csv'
          onChange={e => {
            onFileUpload(e.target.files[0])
          }}
          style={{ display: 'none' }}
          type='file'
        />
        <Button component='span' variant='contained'>
          Upload Transaction CSV
        </Button>
      </label>
      <Typography component='h2' mb={1} mt={3} variant='h5'>transactions.csv</Typography>
      <TableContainer component={Paper}>
        <Table aria-label='transaction csv file format'>
          <TableHead>
            <TableRow>
              <TableCell>Field Name</TableCell>
              <TableCell>Data Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'>
                user_id
              </TableCell>
              <TableCell>text</TableCell>
              <TableCell>The id of the user associated with this transaction</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                description
              </TableCell>
              <TableCell>text</TableCell>
              <TableCell>The purpose of this transaction</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                merchant_id
              </TableCell>
              <TableCell>text</TableCell>
              <TableCell>The id of the merchant associated with this transaction</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                debit
              </TableCell>
              <TableCell>boolean</TableCell>
              <TableCell>True if this transaction was a debit</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                credit
              </TableCell>
              <TableCell>boolean</TableCell>
              <TableCell>True if this transaction was a credit</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                amount
              </TableCell>
              <TableCell>float</TableCell>
              <TableCell>The dollar amount of the transaction</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography mb={1} mt={3}>Sample:</Typography>
      <Card>
        <CardContent>
          <Typography>user_id,description,merchant_id,debit,credit,amount</Typography>
          <Typography>61a3bafdfc3e58721701209f,food,61a3b5fbe093256940c35aa7,true,false,13.23</Typography>
          <Typography>61a3bafdfc3e58721701209f,stuff,61a3b4bae093256940c35aa6,false,true,45.38</Typography>
          <Typography>61a3bb72fc3e5872170120a0,things,61a3b4bae093256940c35aa6,false,true,21.99</Typography>
        </CardContent>
      </Card>
    </Fragment>
  )
}

TransactionCSVUpload.propTypes = {
  onFileUpload: func
}
