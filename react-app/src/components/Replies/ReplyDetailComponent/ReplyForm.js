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
  const [replyData, setReplyData] = useState(reply)
  const [replyUrlData, setReplyUrlData] = useState(replyUrl)
  const [errorMessages, setErrorMessages] = useState([])


  const updateReplyData = (e) => setReplyData(e.target.value)
  const updateReplyUrlData = (e) => setReplyUrlData(e.target.value)

  const handleEdit = (e) => {
    e.preventDefault()
    const payload = {
      reply: replyData,
      replyUrl: replyUrlData
    }

    let validImage = ['.png' , '.jpg' , '.jpeg' , '.gif' , '.bmp' , '.tif' , '.tiff']


    let errors = []


    if (! payload.reply) {
      errors.push(`${firstName} The reply can not be empty`)
    }



    if (payload.replyUrl !== '') {
      if(payload.replyUrl.endsWith(validImage[0]) || payload.replyUrl.endsWith(validImage[1]) || payload.replyUrl.endsWith(validImage[2]) || payload.replyUrl.endsWith(validImage[3]) || payload.replyUrl.endsWith(validImage[4]) || payload.replyUrl.endsWith(validImage[5]) || payload.replyUrl.endsWith(validImage[6])) {
        setEditReply(false)
        handleClose()
        dispatch(updateReplies(payload, id))
      }else{
        errors.push("Not a valid Image")
      }
    }

    if (! errors.length) {
      setEditReply(false)
      setErrorMessages()
      handleClose()
      dispatch(updateReplies(payload, id))
    } else {
      setErrorMessages(errors)
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteReplies(id))
    handleClose()
  }

  return (<> {
    editReply ? (
    <div className='reply_update_form'>
      <center>

        <div className='updateReply_userInfo'>
          <Avatar src={userUrl}/>
          <h3>{firstName} {lastName}</h3>

          <div className='reply_cancel_div'>
          <button
          className='reply_cancel_button'
          onClick={() =>
          {setEditReply(false)
          handleClose()}}>Cancel</button>

          </div>

        </div>

        <div className='update_reply_form_top'>


      <form onSubmit={handleEdit}>

        <ul> {
          errorMessages && errorMessages.map((error, id) => <li key={id}> {error}</li>)
        } </ul>

        <input
          type='text'
          placeholder='Edit your Reply'
          className='form_reply_poster'
          value={replyData}
          onChange={updateReplyData}/>

        <input
          type='text'
          placeholder='Edit your Image (optional)'
          value={replyUrlData}
          onChange={updateReplyUrlData}/>

        <button type='submit'>Apply Changes</button>
      </form>

          </div>
      </center>
    </div>) : (<center>

      <div className='reply'>

        <div className='reply_top'>
          <Avatar className='reply_avatar'
            src={userUrl}/>

          <div className='reply_topInfo'>
            <div className='reply_user_info'>

              <h3> {firstName}
                {lastName}</h3>
              {
              (userId === sessionUser.id) && (
              <div className='reply_drop_menu'>
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
                  <MenuItem onClick={() => {setEditReply(true)}}>

                    <div className='menu_item'>
                    <i className="fa-solid fa-pencil"/>
                    <div className='menu_text'>
                    Edit
                    </div>
                    </div>

                    </MenuItem>

                  <MenuItem
                    onClick={(e) => {handleDelete(e)}}>
                      <div className='menu_item2'>
                      <i className="fa-solid fa-trash"/>
                      <div className='menu_text'>
                      Delete
                      </div>
                      </div>
                      </MenuItem>

                </Menu>
              </div>)
            } </div>
            <p> {dateCreated}</p>
          </div>
        </div>

        <div className='reply_bottom'>
          <p> {reply}</p>
        </div>

        <div>
          <img className ='replyUrl_image'src={replyUrl}
            alt=''/>
        </div>

      </div>

    </center>)
  } </>)
}

export default ReplyForm


// return (
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
// );
// }
