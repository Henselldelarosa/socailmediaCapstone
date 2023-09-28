import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {MoreVert}  from '@mui/icons-material'

import EditReplyModalRender from '../editReplyModal/EditReplyModalRender';
import DeleteIcon from '@mui/icons-material/Delete';
import './ReplyEditDeleteDrop.scss'

const ReplyEditDeleteDrop = ({handleDelete, id, reply, replyUrl, setShowModal}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <MoreVert/>
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
        <MenuItem className='editDelete__delete'onClick={handleDelete}>
          <div className='editDelete__delete__item'>
          <DeleteIcon className='editDelete__delete__icon'/>
          <p className='editDelete__delete__text'>Delete</p>
          </div>
        </MenuItem>

        <MenuItem>
        <EditReplyModalRender id={id} reply={reply} replyUrl={replyUrl}/>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ReplyEditDeleteDrop
