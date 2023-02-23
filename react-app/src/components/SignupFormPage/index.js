import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLaststName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(firstName, lastName, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

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
            type='email'
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </center>

          <center>
            <input
            type='text'
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
          </center>

          <center>
            <input
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLaststName(e.target.value)}
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
