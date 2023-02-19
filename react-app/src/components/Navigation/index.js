import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import BasicMenuSignedIn from './HeaderSignedIn/HeaderSigned';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	let sessionLinks;

	if(sessionUser){
		sessionLinks = (
			<div className='header'>
				<div className='header_logo'>

				<NavLink className='link' to='/'>
				<h1 className='logo'>Sagebook</h1>
				</NavLink>
				</div>


				<div className='header_center'>
					<div className='header_icons'>
				<i className="fa-sharp fa-solid fa-house"></i>
					</div>
				</div>

				<div className='header_right'>
					<h3>{sessionUser.firstName} {sessionUser.lastName}</h3>
					<BasicMenuSignedIn/>
				</div>
			</div>
		)
	}else{
		sessionLinks = (

			<div className='header'>

			</div>
		)
	}


	return (isLoaded, sessionLinks)
// console.log(sessionUser)
// 	return (
// 		<ul>
// 			<li>
// 				<NavLink exact to="/">Home</NavLink>
// 			</li>
// 			{isLoaded && (
// 				<li>
// 					<ProfileButton user={sessionUser} />
// 				</li>
// 			)}
// 		</ul>
// 	);
}

export default Navigation;
