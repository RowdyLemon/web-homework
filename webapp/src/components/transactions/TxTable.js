import { arrayOf, func } from 'prop-types'
import React from 'react'
import { Transaction } from '../../gql/Transaction'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export const TxTable = ({ data, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='transactions' sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='right'>User ID</TableCell>
            <TableCell align='right'>Description</TableCell>
            <TableCell align='right'>Merchant ID</TableCell>
            <TableCell align='right'>Debit</TableCell>
            <TableCell align='right'>Credit</TableCell>
            <TableCell align='right'>Amount</TableCell>
            <TableCell align='right' />
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
              <TableCell align='right' data-testid={makeDataTestId(tx.id, 'debit')}>{tx.debit && <CheckIcon />}</TableCell>
              <TableCell align='right' data-testid={makeDataTestId(tx.id, 'credit')}>{tx.credit && <CheckIcon />}</TableCell>
              <TableCell align='right' data-testid={makeDataTestId(tx.id, 'amount')}>{tx.amount}</TableCell>
              <TableCell align='right'>
                <IconButton
                  aria-label='delete transaction'
                  onClick={() => onDelete({ variables: { id: tx.id } })}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

TxTable.propTypes = {
  data: arrayOf(Transaction.shape),
  onDelete: func
}
