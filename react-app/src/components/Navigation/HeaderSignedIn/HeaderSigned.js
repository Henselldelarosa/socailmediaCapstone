import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionAction from '../../../store/session'
import { useHistory, Redirect, } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './HeaderSigned.scss'

export default function BasicMenuSignedIn() {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = (e) =>{
    e.preventDefault()
    handleClose()
    dispatch(sessionAction.logout())
    history.push('/login')
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar src={sessionUser?.userUrl}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem className='headerSigned--logout'onClick={handleLogOut}><ExitToAppIcon className='headerSigned--logout--icon'/><p className='headerSigned--logout--text'>Logout</p></MenuItem>
      </Menu>
    </div>
  );
}
