import { arrayOf, func, shape, string } from 'prop-types'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import React from 'react'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export const MerchantsTable = ({ data, onDelete, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='merchants'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='right'>Name</TableCell>
            <TableCell align='right' />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(merchant => (
            <TableRow
              data-testid={`merchant-${merchant.id}`}
              key={`merchant-${merchant.id}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>{merchant.id}</TableCell>
              <TableCell align='right'>{merchant.name}</TableCell>
              <TableCell align='right'>
                <Stack direction='row' justifyContent='end'>
                  <IconButton
                    aria-label='edit transaction'
                    onClick={() => onEdit(merchant)}
                  >
                    <EditIcon fontSize='small' />
                  </IconButton>
                  <IconButton
                    aria-label='delete transaction'
                    onClick={() => onDelete({ variables: { id: merchant.id } })}
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

MerchantsTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    name: string
  })),
  onDelete: func,
  onEdit: func
}
