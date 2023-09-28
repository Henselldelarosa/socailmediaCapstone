import React, { useState } from 'react'
import { Button } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './ReplyEditImageUpload.scss'
import UploadIcon from '@mui/icons-material/Upload';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const ReplyEditImageUpload = ({setReplyUrl, replyUrl}) => {

  const [image, setImage] = useState(null)
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImg, setUploadImg] = useState(false);
  const [prevImgUrl, setPrevImgUrl] = useState("");

  const handleImageSubmit = async (e) => {
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
      <form onSubmit={handleImageSubmit}>

      <input
      type='file'
      accept="image/*"
      id='replyEditUtiUpload'
      onChange={updateImage}
      hidden
      />

      {image? (
        <div className="replyEditImageContainer">
          <center>

          <img
          className="replyEditPreviewImage"
          as='label'
          src={URL.createObjectURL(image)}
          alt='Image preview'
          // width={'350px'}
          />
          {imageLoading && <p className="loading_image">...Loading</p>}
          </center>
            <button title ='Upload Image' className='replyEditImageSubmit' type='submit'><UploadIcon className='replyEditUploadIcon'/></button>
        </div>
      ): <>


      <Button
      as='label'
      htmlFor='replyEditUtiUpload'
      cursor='pointer'
      mb={4}
      >

        <div className="replyEditImageDiv">

          <div className="replyEditImageCenter">

            <center>

              {replyUrl ?
              <>
              <div className='replyEditBlankContainer'>

                <center>
                  <div className="replyEditBlank"></div>
                  <AddToPhotosIcon className='replyEditAddIcon'/>
                  <p className="replyEditAddImageText">Edit Image</p>
                </center>

              </div>
               <img
              src={replyUrl}
              alt=""
              className="replyEditEditImg" />
              </>
              :
              <>

              <div className='replyEditBlankNoImageContainer'>
              <div className="replyEditNoImage">
              <AddToPhotosIcon className='replyEditNoImageIcon'/>
              <p>Add Photo</p>
              </div>

              </div>
              </>}


            </center>

          </div>

        </div>
      </Button>
      </>}
      </form>
    </div>
  );
}

export default ReplyEditImageUpload
