import React, { useState } from "react";
import "./PostImageUpload.css";
import { Button } from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const ImageUploadComponent = ({ setPostUrl }) => {
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImg, setUploadImg] = useState(false);
  const [prevImgUrl, setPrevImgUrl] = useState("");

  const handleSubmit = async (e) => {
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
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}
      className='upload-form-container'>
        <div className="upload-photo-container"> */}
          <input
          type="file"
          accept="image/*"
          id='uli_input'
          hidden
          onChange={updateImage} />
          {/* <button type="submit" className="upload-img-btn">Upload</button> */}

          <Button
          as='label'
          htmlFor='uli_input'
          cursor='pointer'
          mb={4}
          >

            <div className="image_upload_upload">

            <div className="image_upload_div">

              <center>

                <AddToPhotosIcon/>
                <p>Add Photo</p>

              </center>

            </div>

            </div>

          </Button>

        {/* </div>
        {imageLoading && <p>Loading...</p>}
      </form>
      {uploadedImg && (
        <img src={prevImgUrl} alt="yours" className="prev_img" />
      )} */}
    </>
  );
};

export default ImageUploadComponent;
