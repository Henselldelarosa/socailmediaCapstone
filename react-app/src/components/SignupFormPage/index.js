import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userUrl, setUserUrl] = useState('')
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   let error =[]

  //   if (password === confirmPassword && userUrl === '') {
  //       const data = await dispatch(signUp(firstName, lastName, email, password));
  //       if (data) {
  //         setErrors(data)
  //       }
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault()
    let validImage = ['.png' , '.jpg' , '.jpeg' , '.gif' , '.bmp' , '.tif' , '.tiff']

    if (password !== confirmPassword){
      return setErrors(["Your confirm password doesn't match your password"])

    }else if(!firstName || !lastName || !email || !password){
      return setErrors(["First Name, Last Name, Email, and Password field are required"])

    }else if(userUrl !== ''){
      if(userUrl.endsWith(validImage[0]) || userUrl.endsWith(validImage[1]) || userUrl.endsWith(validImage[2])|| userUrl.endsWith(validImage[3]) || userUrl.endsWith(validImage[4]) || userUrl.endsWith(validImage[5]) || userUrl.endsWith(validImage[6])){

        const data = await dispatch(signUp(firstName, lastName, email, password, userUrl)).then(
          async (res) =>{
            const data = await res

            if(data) {
              const newError = res.map((ele) => {
                return ele.slice(ele.indexOf(':') + 2)
              })
              setErrors(newError)
            }
          }
        )

      }else{
        return setErrors(['Not a valid Image'])
      }
    }else if(userUrl === ''){
        const data = await dispatch(signUp(firstName, lastName, email, password)).then(
          async (res) =>{
            const data = await res

            if(data) {
              const newError = res.map((ele) => {
                return ele.slice(ele.indexOf(':') + 2)
              })
              setErrors(newError)
            }
          }
        )
    }
  }

  return (

    <div className="signup">

      <h1 className="signup_logo">Sagebook</h1>

      <div className="signup_container">

        <h3>Sign Up To Sagebook</h3>

        <form onSubmit={handleSubmit}>

           <ul className="sign_up_error">
             {errors.map((error, idx) => <li key={idx}>{error}</li>)}
           </ul>

          <center>
          <input
            type='text'
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            // required
            />

          </center>

          <center>
            <input
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            // required
            />
          </center>

          <center>
            <input
            type='email'
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </center>

          <center>
            <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </center>

          <center>
            <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
          </center>

          <center>
            <input
            type='text'
            placeholder="Profile Image"
            value={userUrl}
            onChange={(e) => setUserUrl(e.target.value)}/>
          </center>

          <center>
            <button type="submit" className="signup_button">
              Sign Up
            </button>
          </center>


        </form>

          <center>
            <div className="bottom_info">
             <button className="signup_cancel">
              <NavLink className='link' to='/login'>Cancel</NavLink>
             </button>
            </div>
          </center>

      </div>


    </div>
    // <>
    //   <h1>Sign Up</h1>
    //   <form onSubmit={handleSubmit}>
    //     <ul>
    //       {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    //     </ul>
    //     <label>
    //       Email
    //       <input
    //         type="text"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </label>
    //     <label>
    //       Username
    //       <input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //       />
    //     </label>
    //     <label>
    //       Password
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </label>
    //     <label>
    //       Confirm Password
    //       <input
    //         type="password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //         required
    //       />
    //     </label>
    //     <button type="submit">Sign Up</button>
    //   </form>
    // </>
  );
}

export default SignupFormPage;
