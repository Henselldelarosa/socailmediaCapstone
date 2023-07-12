import React,{useState} from 'react'
import './ProfileImageUpload.css'
import { Button } from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
const ProfileImageUpload = ({setUserUrl, user}) => {

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
      setUserUrl(img_url.url);
      // setProfileUrl(img_url.url)
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
    <div className="profile_file_upload_div">
      <form onSubmit={handleSubmit}>

      <input
      type='file'
      accept="image/*"
      id='profile_uti_upload'
      onChange={updateImage}
      hidden
      />

      {image? (
        <div className="image_container">
          <center>

          <img
          className="profile_profilePreviewImage"
          as='label'
          src={URL.createObjectURL(image)}
          alt='Image preview'
          width={'350px'}
          />
          {imageLoading && <p className="loading_image">...Loading</p>}
          </center>
            <button className='profile_image_submit' type='submit'>Upload</button>
        </div>
      ): <>


      <Button
      as='label'
      htmlFor='profile_uti_upload'
      cursor='pointer'
      mb={4}
      >

        <div className="profile_image_upload_div">

          <div className="profile_image_center">

            <center>
              <img
              src={user?.userUrl}
              alt=""
              className="profile_editImg" />
            </center>

          </div>

        </div>
      </Button>
      </>}
      </form>
    </div>
  );
}

export default ProfileImageUpload