import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import { NavLink } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import React, { Fragment, useState } from 'react'
import Stack from '@mui/material/Stack'
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
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/another'>
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Another Route' />
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
          </List>
        </Box>
      </Drawer>
    </Fragment>
  )
}
