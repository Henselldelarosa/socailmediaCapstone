import React, { useState } from "react";
import "./PostImageUpload.css";

import UploadIcon from '@mui/icons-material/Upload';

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
      <form
      onSubmit={handleSubmit}
      className='upload-form-container'>

        <div className="upload-photo-container">

          <input
          type="file"
          accept="image/*"
          className='uli_input'
          onChange={updateImage.submit} />
          <button data-title='Upload' type="submit" className="upload-img-btn" onClick={(e) => setPostUrl('')}> <UploadIcon/></button>
        </div>
        {imageLoading && <p>Loading...</p>}
      </form>
      {/* {uploadedImg && (
        <img
        // width={}
        src={prevImgUrl} alt="yours" className="prev_img" />
      )} */}
    </>
  );
};

export default ImageUploadComponent;
