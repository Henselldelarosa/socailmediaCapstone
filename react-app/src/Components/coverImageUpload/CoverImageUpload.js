import React,{useState} from 'react'
import './CoverImageUpload.scss'
import { Button } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadIcon from '@mui/icons-material/Upload';

const CoverImageUpload = ({setCoverUrl, sessionUser}) => {
  const [image, setImage] = useState(null)
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImg, setUploadImg] = useState(false);
  const [prevImgUrl, setPrevImgUrl] = useState("");

  const handleSubmit = async(e) => {
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
      setCoverUrl(img_url.url);
      setUploadImg(true);
      setPrevImgUrl(img_url.url);
    } else {
      setImageLoading(false);
    }
  }

  const updateImage = (e) => {
    if(e.target.files && e.target.files.length > 0)
    setImage(e.target.files[0])
  };

  return (
    <div className="profileCoverImg">
      <form onSubmit={handleSubmit}>

      <input
      type='file'
      accept="image/*"
      id='profileCoverImg__utiUpload'
      onChange={updateImage}
      hidden
      />

      {image? (
        <div className="profileCoverImg__container">
          <center>

          <img
          className="profileCoverImg__container--previewImg"
          as='label'
          src={URL.createObjectURL(image)}
          alt='Image preview'
          width={'350px'}
          />
          </center>
            <button title='Upload Image' className='profileCoverImg__container--submit' type='submit'>
              <UploadIcon
              title='Change Image'
              className='profileCoverImg__container--submit--icon'
              style={{fontSize:'40px'}}
              />
            </button>
          {imageLoading && <p className="loading_image">...Loading</p>}
        </div>
      ): <>


      <Button
      as='label'
      htmlFor='profileCoverImg__utiUpload'
      cursor='pointer'
      mb={4}
      title='Change Image'
      >

        <div className="profileCoverImg__OpenFile">

          <div className="profileCoverImg__center">

            <center>
              <div className="profileCoverImg__selectContainer">
                {/* <button title='Change Image'> */}
                  <CameraAltIcon title='Change Image' style={{fontSize:'40px'}}className='profileCoverImg__selectContainer--icon'/>
                {/* </button> */}
              </div>
            </center>

          </div>

        </div>
      </Button>
      <img
      src={sessionUser?.profile_url}
      alt=""
      className="profileCoverImg__selectContainer--currentImg" />
      </>}
      </form>
    </div>
  );
}

export default CoverImageUpload
