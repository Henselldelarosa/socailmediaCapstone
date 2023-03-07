import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoLogin = (e) =>{
    e.preventDefault()
    let email = "demo@aa.io"
    let password = "password"
    dispatch(login(email, password))
    history.push('/')
  }

  return (

    <div className="login">
      <h1 className="login_logo">Sagebook</h1>

      <div className="login_container">
        <h3>Login In To Sagebook</h3>
      <form onSubmit={handleSubmit}>

        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <center>
        <input
        type='email'
        className="login_ele"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        </center>

        <center>
        <input
        type='password'
        className="login_ele"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        </center>


        <center>
          <button type='submit' className="login_button">
            Log In
          </button>
        </center>


      </form>
        <center>

          <hr></hr>
        <div className="bottom_info">

          <button className="login_signup">
          <NavLink className='link' to='/signup'>Create new account </NavLink>
          </button>

        <button className='demo_login_button'onClick={handleDemoLogin}>Demo Login</button>
        </div>




        </center>

      </div>

    </div>
    // <div className="login_form_div">
    //   <h1 className="loging_header">Login</h1>
    //   <form className='login_form' onSubmit={handleSubmit}>
    //     <ul>
    //       {errors.map((error, idx) => (
    //         <li key={idx}>{error}</li>
    //       ))}
    //     </ul>

    //     <input
    //     type="text"
    //     className="login_ele"
    //     placeholder="Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     required
    //     />

    //     <input
    //     type='text'
    //     className="login_ele"
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     required
    //     />

    //     <button type="submit">Log In</button>
    //   </form>
    // </div>
  );
}

export default LoginFormPage;
