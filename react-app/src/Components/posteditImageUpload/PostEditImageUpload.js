import React, {useState} from 'react'
import './PostEditImageUpload.scss'
import {Button} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import UploadIcon from '@mui/icons-material/Upload';

const PostEditImageUpload = ({setPostUrl, postUrl, hideForm}) => {
  const [image, setImage] = useState(null);
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
      setPostUrl(img_url.url);
      setUploadImg(true);
      setPrevImgUrl(img_url.url);
    } else {
      setImageLoading(false);
    }
  };

  const updateImage = (e) => {
    if(e.target.files && e.target.files.length > 0)
    setImage(e.target.files[0])
  };


  return (
    <div className="postEditFileUploadDiv">
      <form onSubmit={handleImageSubmit}>

      <input
      type='file'
      accept="image/*"
      id='postEditUtiUpload'
      onChange={updateImage}
      hidden
      />

      {image? (
        <div className="postEditImageContainer">
          <center>

          <img
          className="postEditPreviewImage"
          as='label'
          src={URL.createObjectURL(image)}
          alt='Image preview'
          // width={'350px'}
          />
          {imageLoading && <p className="loading_image">...Loading</p>}
          </center>
            <button title ='Upload Image' className='postEditImageSubmit' type='submit'><UploadIcon className='postEditUploadIcon'/></button>
        </div>
      ): <>


      <Button
      as='label'
      htmlFor='postEditUtiUpload'
      cursor='pointer'
      mb={4}
      >

        <div className="postEditImageDiv">

          <div className="postEditImageCenter">

            <center>
              <div className='postEditBlankContainer'>

                <center>
                  <div className="postEditBlank"></div>
                  <AddToPhotosIcon className='postEditAddIcon'/>
                  <p className="postEditAddImageText">Edit Image</p>
                </center>

              </div>

              <img
              src={postUrl}
              alt=""
              className="postEditEditImg" />
            </center>

          </div>

        </div>
      </Button>
      </>}
      </form>
    </div>
  );
}

export default PostEditImageUpload
