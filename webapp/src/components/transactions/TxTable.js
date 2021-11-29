import { arrayOf, func } from 'prop-types'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import React, { useContext } from 'react'
import { romanizeNumber } from '../../utils'
import { SettingsManagerContext } from '../SettingsManager'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Transaction } from '../../gql/Transaction'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export const TxTable = ({ data, onDelete, onEdit }) => {
  const { romanize } = useContext(SettingsManagerContext)

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
              <TableCell align='right' data-testid={makeDataTestId(tx.id, 'amount')}>{romanize ? romanizeNumber(tx.amount) : tx.amount}</TableCell>
              <TableCell align='right'>
                <Stack direction='row'>
                  <IconButton
                    aria-label='edit transaction'
                    onClick={() => onEdit(tx)}
                  >
                    <EditIcon fontSize='small' />
                  </IconButton>
                  <IconButton
                    aria-label='delete transaction'
                    onClick={() => onDelete({ variables: { id: tx.id } })}
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </Stack>
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
  onDelete: func,
  onEdit: func
}
