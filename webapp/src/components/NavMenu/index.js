import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'

export const NavMenu = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <div>
      <IconButton
        aria-label='menu'
        color='inherit'
        edge='start'
        onClick={handleOpenNavMenu}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        id='menu-appbar'
        keepMounted
        onClose={handleCloseNavMenu}
        open={Boolean(anchorElNav)}
        sx={{ mt: '45px' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Link style={{ textDecoration: 'none' }} to='/'>
            <Typography textAlign='center'>Home</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleCloseNavMenu}>
          <Link style={{ textDecoration: 'none' }} to='/another'>
            <Typography textAlign='center'>Another Route</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  )
}
