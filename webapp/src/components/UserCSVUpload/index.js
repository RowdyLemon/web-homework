import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import React, { Fragment } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

export const UserCSVUpload = () => {
  return (
    <Fragment>
      <label htmlFor='upload-user-csv'>
        <input
          accept='.csv'
          id='upload-user-csv'
          name='upload-user-csv'
          style={{ display: 'none' }}
          type='file'
        />
        <Button component='span' variant='contained'>
          Upload User CSV
        </Button>
      </label>
      <Typography component='h2' mb={1} mt={3} variant='h5'>users.csv</Typography>
      <TableContainer component={Paper}>
        <Table aria-label='users csv file format'>
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
                first_name
              </TableCell>
              <TableCell>text</TableCell>
              <TableCell>The first name of a user</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                last_name
              </TableCell>
              <TableCell>text</TableCell>
              <TableCell>The last name of a user</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                dob
              </TableCell>
              <TableCell>text</TableCell>
              <TableCell>The date of birth of a user. The preferred format being Month Day, Year e.g. November 21, 1988</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography mb={1} mt={3}>Sample:</Typography>
      <Card>
        <CardContent>
          <Typography>user_name,last_name,dob</Typography>
          <Typography>Matthew,Lemon,&#34;November 21, 1988&#34;</Typography>
          <Typography>Ben,Nelson,&#34;January 1, 1990&#34;</Typography>
          <Typography>Tyler,Burraston,&#34;March 2, 1991&#34;</Typography>
        </CardContent>
      </Card>
    </Fragment>
  )
}
