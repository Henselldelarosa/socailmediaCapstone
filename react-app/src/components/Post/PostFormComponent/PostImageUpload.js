import React, { useState } from "react";
import "./PostImageUpload.css";
import { Button } from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const ImageUploadComponent = ({ setPostUrl }) => {
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
    <div className="file_upload_div">
      <form onSubmit={handleImageSubmit}>

      <input
      type='file'
      accept="image/*"
      id='uti_upload'
      onChange={updateImage}
      hidden
      />

      {image? (
        <div className="image_container">
          <center>

          <img
          className="previewImage"
          as='label'
          src={URL.createObjectURL(image)}
          alt='Image preview'
          width={'350px'}
          />
          {imageLoading && <p className="loading_image">...Loading</p>}
          </center>
            <button className='image_submit' type='submit'>Upload</button>
        </div>
      ): <>


<Button
      as='label'
      htmlFor='uti_upload'
      cursor='pointer'
      mb={4}
      >

        <div className="image_upload_div">

          <div className="image_center">

            <center>
              <AddToPhotosIcon/>
              <p>Add Photo</p>
            </center>

          </div>

        </div>
      </Button>
      </>}
      </form>
    </div>
  );
};

export default ImageUploadComponent
