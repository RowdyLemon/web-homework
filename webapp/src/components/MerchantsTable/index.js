import Paper from '@mui/material/Paper'
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { arrayOf, shape, string } from 'prop-types'

export const MerchantsTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='merchants'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(merchant => (
            <TableRow
              data-testid={`merchant-${merchant.id}`}
              key={`merchant-${merchant.id}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th'>{merchant.id}</TableCell>
              <TableCell>{merchant.name}</TableCell>
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
  }))
}
