import React, { useState } from 'react'
import { Button } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './ReplyEditImageUpload.scss'


const ReplyEditImageUpload = ({setReplyUrl, replyUrl}) => {

  const [image, setImage] = useState(null)
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImg, setUploadImg] = useState(false);
  const [prevImgUrl, setPrevImgUrl] = useState("");

  const editReplyImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    setImageLoading(true);

    formData.append("image", image);
    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const img_url = await res.json();
      setImageLoading(false);
      setReplyUrl(img_url.url);
      setUploadImg(true);
      setPrevImgUrl(img_url.url);
    } else {
      setImageLoading(false);
    }
  }

  const updateImage = (e) => {
    if(e.target.files && e.target.files.length > 0)
    setImage(e.target.files[0])
  }


  return (
    <div className="replyEditFileUploadDiv">
      <form onSubmit={editReplyImageSubmit}>

      <input
      type='file'
      accept="image/*"
      id='replyEditUtiUpload'
      onChange={updateImage}
      hidden
      />

      {image? (
        <div className="replyEditImgContainer">
          <center>

          <img
          // style={
          //   {height:'50vh',
          //   // position:'abolute',
          //   width:'85%'
          // }}
          className="replyEditImgPreview"
          as='label'
          src={URL.createObjectURL(image)}
          alt='Image preview'

          />
          {imageLoading && <p className="replyEditLoadingImg">...Loading</p>}
          </center>
            <button className='replyEditImgSubmit' type='submit'>Upload</button>
        </div>
      )
      :
      <div className='editReplyDivContainer'>

      <img
      src={replyUrl}
      alt=""
      className="replyEditEditImg"
      />

      <Button
      as='label'
      htmlFor='replyEditUtiUpload'
      cursor='pointer'
      className='overlay'
      mb={4}
      >

        {/* <div className="replyEditImgUploadDiv"> */}

          {/* <div className="replyEditImgCenter"> */}

            {/* <center> */}
              {/* <div className="replyEditImgContainerBefore"> */}

                {/* <div className="overlay"> */}
                <CameraAltIcon className='replyEditImgIcon'/>
                {/* </div> */}
              {/* </div> */}
            {/* </center> */}

          {/* </div> */}

        {/* </div> */}
      </Button>
      </div>}
      </form>
    </div>
  );
}

export default ReplyEditImageUpload