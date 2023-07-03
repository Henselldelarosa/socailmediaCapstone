import React, {useState} from 'react'
import './Login.css'

import { login } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect, NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);

  // state
  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [errors , setErrors] = useState([])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    setPassword('')
    setEmail('')
  };

  const handleDemoLogin = (e) =>{
    e.preventDefault()
    let email = "demo@aa.io"
    let password = "password"
    dispatch(login(email, password))
    history.push('/')
  }

  return (
    <div className='login'>

      <div className="loginWrapper">

        <div className="loginLeft">
          <h3 className="loginLogo">Sagebook</h3>
          <span className="loginDes">
              Connect with friends and the world around you on Facebook.
          </span>
        </div>

        <div className="loginRight">

          <div className="loginBox">

            <div className="bottom">

              <form onSubmit={handleSubmit} className="bottomBox">
                <ul>
                  {errors.map((error, idx) =>(
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
                <input
                type="email"
                className="loginInput"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                <input
                type="password"
                className="loginInput"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />

                {/* <hr /> */}
                <button type='submit' className="loginButton">Log In</button>

                <button className="loginRegisterButton">
                <NavLink className='link' to='/signup'>Create new account </NavLink>
                </button>

                <button className='demoLogin' onClick={handleDemoLogin}>Demo Log In</button>
              </form>

              {/* <div> */}
              {/* </div> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
