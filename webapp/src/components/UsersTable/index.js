import { arrayOf, func, shape, string } from 'prop-types'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export const UsersTable = ({ data, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='users'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='right'>First Name</TableCell>
            <TableCell align='right'>Last Name</TableCell>
            <TableCell align='right'>Date of Birth</TableCell>
            <TableCell align='right' />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(user => (
            <TableRow
              data-testid={`user-${user.id}`}
              key={`user-${user.id}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th'>{user.id}</TableCell>
              <TableCell align='right'>{user.first_name}</TableCell>
              <TableCell align='right'>{user.last_name}</TableCell>
              <TableCell align='right'>{user.dob}</TableCell>
              <TableCell align='right'>
                <IconButton
                  aria-label='delete user'
                  onClick={() => onDelete({ variables: { id: user.id } })}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

UsersTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    first_name: string,
    last_name: string,
    dob: string
  })),
  onDelete: func
}
