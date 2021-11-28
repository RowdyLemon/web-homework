import { arrayOf } from 'prop-types'
import React from 'react'
import { Transaction } from '../../gql/Transaction'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export const TxTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table' sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='right'>User ID</TableCell>
            <TableCell align='right'>Description</TableCell>
            <TableCell align='right'>Merchant ID</TableCell>
            <TableCell align='right'>Debit</TableCell>
            <TableCell align='right'>Credit</TableCell>
            <TableCell align='right'>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((tx) => (
            <TableRow
              data-testid={`transaction-${tx.id}`}
              key={`transaction-${tx.id}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' data-testid={makeDataTestId(tx.id, 'id')} scope='row'>
                {tx.id}
              </TableCell>
              <TableCell align='right' data-testid={makeDataTestId(tx.id, 'userId')}>{tx.user_id}</TableCell>
              <TableCell align='right' data-testid={makeDataTestId(tx.id, 'description')}>{tx.description}</TableCell>
              <TableCell align='right' data-testid={makeDataTestId(tx.id, 'merchant')}>{tx.merchant_id}</TableCell>
              <TableCell align='right' data-testid={makeDataTestId(tx.id, 'debit')}>{tx.debit}</TableCell>
              <TableCell align='right' data-testid={makeDataTestId(tx.id, 'credit')}>{tx.credit}</TableCell>
              <TableCell align='right' data-testid={makeDataTestId(tx.id, 'amount')}>{tx.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

TxTable.propTypes = {
  data: arrayOf(Transaction.shape)
}
