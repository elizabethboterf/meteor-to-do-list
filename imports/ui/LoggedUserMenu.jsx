import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';

const settingsDefault = ['Logout'];

export const LoggedUserMenu = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [viewUsers, setViewUsers] = useState(false);

  const navigate= useNavigate();

  const user = Meteor.user();
  let settings = [];

  //update defualt user fields
  if(user.admin){
    settings=([...settingsDefault, 'View Users']);
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSetting = (setting) => {

    switch(setting){
      case 'Logout':
        Meteor.logout();
        navigate("/login");
        break;
      case 'View Users':
        setViewUsers(true);
        navigate("/view-users")
        break;
    }

  }

  return (
    <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <AccountCircle />
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {settings.map((setting) => (
            <MenuItem key={setting} onClick={(e) =>{
                handleSetting(setting);
                handleCloseUserMenu();
                }}>
                <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
            ))}
        </Menu>
    </Box>
        
  );
}