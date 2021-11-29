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

export const MerchantCSVUpload = ({ onFileUpload }) => {
  return (
    <Fragment>
      <label htmlFor='upload-merchant-csv'>
        <input
          accept='.csv'
          data-testid='upload-merchant-csv'
          id='upload-merchant-csv'
          name='upload-merchant-csv'
          onChange={e => {
            onFileUpload(e.target.files[0])
          }}
          style={{ display: 'none' }}
          type='file'
        />
        <Button component='span' variant='contained'>
          Upload Merchant CSV
        </Button>
      </label>
      <Typography component='h2' mb={1} mt={3} variant='h5'>merchants.csv</Typography>
      <TableContainer component={Paper}>
        <Table aria-label='merchants csv file format'>
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
                name
              </TableCell>
              <TableCell>text</TableCell>
              <TableCell>The name of the merchant</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography mb={1} mt={3}>Sample:</Typography>
      <Card>
        <CardContent>
          <Typography>name</Typography>
          <Typography>Amazon</Typography>
          <Typography>Target</Typography>
          <Typography>Walmart</Typography>
        </CardContent>
      </Card>
    </Fragment>
  )
}

MerchantCSVUpload.propTypes = {
  onFileUpload: func
}
