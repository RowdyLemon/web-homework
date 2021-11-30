import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import IconButton from '@mui/material/IconButton'
import { NavLink } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import PaidIcon from '@mui/icons-material/Paid'
import PeopleIcon from '@mui/icons-material/People'
import React, { Fragment, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import Stack from '@mui/material/Stack'
import StorefrontIcon from '@mui/icons-material/Storefront'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <AppBar open={open} position='static'>
        <Toolbar>
          <IconButton
            aria-label='open menu'
            color='inherit'
            edge='start'
            onClick={() => setOpen(true)}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='div' sx={{ flexGrow: 1 }} variant='h6'>
            Divvy Homework
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' onClose={() => setOpen(false)} open={open}>
        <Box role='presentation' sx={{ width: 300 }}>
          <Stack direction='row' justifyContent='end' sx={{ p: 1 }}>
            <IconButton onClick={() => setOpen(false)} size='large'>
              <ChevronLeftIcon />
            </IconButton>
          </Stack>
          <Divider />
          <List>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/'>
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <PaidIcon />
                </ListItemIcon>
                <ListItemText primary='Transactions' />
              </ListItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/users'>
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary='Users' />
              </ListItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/merchants'>
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText primary='Merchants' />
              </ListItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/csv_upload'>
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <FileUploadIcon />
                </ListItemIcon>
                <ListItemText primary='Upload CSV' />
              </ListItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/settings'>
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary='Settings' />
              </ListItem>
            </NavLink>
          </List>
        </Box>
      </Drawer>
    </Fragment>
  )
}
