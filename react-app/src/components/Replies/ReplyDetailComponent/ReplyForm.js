// libraries
import { Avatar } from '@mui/material'
import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// thunk
import { addAReply, updateReplies,deleteReplies } from '../../../store/reply'

// handle drop down
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// css
import './ReplyForm.css'

function ReplyForm({
  id,
  user,
  reply,
  replyUrl,
  dateCreated,
  postId,
  reactions,
  userUrl,
  firstName,
  lastName,
  userId
}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const replies = useSelector(state => Object.values(state.replies))

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [editReply, setEditReply] = useState(false)
  const [replyData, setReplyData] = useState(replies[id])
  const [errorMessages, setErrorMessages] = useState([])
// const [, set] = useState()


  const handleEdit = (e) => {
    e.preventDefault()

    dispatch(updateReplies(replyData, id, postId))
    setReplyData('')
    setEditReply(false)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteReplies(id))
    handleClose()
  }
  return (
    <>
    {editReply ? (
      <div>
        <Avatar src={userUrl}/>

        <input
         type='text'
         value={replyData}
         onChange={(e) => {
          setReplyData(e.target.value)
         }}
         />

         <form onSubmit={handleEdit}>
          <button onClick={() => {setEditReply(false)}}>Cancel</button>
          <button>Apply Changes</button>
         </form>
      </div>

    ) : (

      <center>

        <div className='reply'>

          <div className='reply_top'>
            <Avatar className='reply_avatar' src={userUrl}/>

          <div className='reply_topInfo'>
            <div className='reply_user_info'>

              <h3>{firstName} {lastName}</h3>
              {(userId === sessionUser.id) && (
                <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <div className='edit_delete_dropdown_icon'>
                <i className="fa-solid fa-ellipsis"/>
                </div>
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
                <MenuItem onClick={(e) => {setEditReply(true)}}>Edit</MenuItem>
                <MenuItem onClick={(e) => {handleDelete(e)}}>Delete</MenuItem>
              </Menu>
              </div>
              )}
            </div>
            <p>{dateCreated}</p>
          </div>
          </div>

          <div className='reply_bottom'>
            <p>{reply}</p>
          </div>

          <div>
            <img src={replyUrl} alt=''/>
          </div>

        </div>

      </center>
    )

    }
    </>
  )
}

export default ReplyForm




//   return (
//     <div>
//       <Button
//         id="basic-button"
//         aria-controls={open ? 'basic-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         Dashboard
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={handleClose}>My account</MenuItem>
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
// }
