// libraries
import {Avatar} from '@mui/material'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// thunk
import {addAReply, updateReplies, deleteReplies} from '../../../store/reply'

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [editReply, setEditReply] = useState(false)
  const [currentReplyDetail, setCurrentReplyDetail] = useState(reply)
  const [currentReplyUrlDetail, setCurrentReplyUrlDetail] = useState(replyUrl)
  const [errorMessages, setErrorMessages] = useState([])
  // const [, set] = useState()

  const updateReply = (e) => setCurrentReplyDetail(e.target.value)
  const updateReplyUrl = (e) => setCurrentReplyUrlDetail(e.target.value)

  const handleEdit = (e) => {
    e.preventDefault()
    const editedReply = {
      reply: currentReplyDetail,
      replyUrl: currentReplyUrlDetail
    }

    dispatch(updateReplies(editedReply, postId, id))
    setCurrentReplyDetail('')
    setCurrentReplyUrlDetail('')
    setEditReply(false)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteReplies(id, postId))
    handleClose()
  }
  return (
    <> {
      editReply ? (
        <div>
          <Avatar src={userUrl}/>

          <input type='text'
            value={currentReplyDetail}
            onChange={updateReply}/>

          <input type='text'
            valur={currentReplyUrlDetail}
            onChange={updateReplyUrl}/>

          <form onSubmit={handleEdit}>
            <button onClick={
              () => {
                setEditReply(false)
              }
            }>Cancel</button>
            <button>Apply Changes</button>
          </form>
        </div>

      ) : (

        <center>

          <div className='reply'>

            <div className='reply_top'>
              <Avatar className='reply_avatar'
                src={userUrl}/>

              <div className='reply_topInfo'>
                <div className='reply_user_info'>

                  <h3>{firstName}
                    {lastName}</h3>
                  {
                  (userId === sessionUser.id) && (
                    <div>
                      <Button id="basic-button"
                        aria-controls={
                          open ? 'basic-menu' : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={
                          open ? 'true' : undefined
                        }
                        onClick={handleClick}>
                        <div className='edit_delete_dropdown_icon'>
                          <i className="fa-solid fa-ellipsis"/>
                        </div>
                      </Button>
                      <Menu id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={
                          {'aria-labelledby': 'basic-button'}
                      }>
                        <MenuItem onClick={
                          () => {
                            setEditReply(true)
                          }
                        }>Edit</MenuItem>
                        <MenuItem onClick={
                          (e) => {
                            handleDelete(e, postId, reply.id)
                          }
                        }>Delete</MenuItem>
                      </Menu>
                    </div>
                  )
                } </div>
                <p>{dateCreated}</p>
              </div>
            </div>

            <div className='reply_bottom'>
              <p>{reply}</p>
            </div>

            <div>
              <img src={replyUrl}
                alt=''/>
            </div>

          </div>

        </center>
      )
    } </>
  )
}

export default ReplyForm
