
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'
import logo from "../../images/logoIcon.png"

const NavBar = () => {

  const user = useSelector((state) => state.session.user)

  return (
    <nav>
      <ul>
        <li className="logo">
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src={logo} alt="" />
            <p>Upkeep</p>
          </NavLink>
        </li>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/decks' exact={true} activeClassName='active'>
            Browse Decks
          </NavLink>
        </li>
        {user !== null && 
        <li>
          <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active'>
            Your Decks
          </NavLink>
        </li>}
        <li className='user-controls'>
          {user !== null && 
          <li>
            <NavLink to='/new-deck' exact={true} activeClassName='active'>
              Create a deck
            </NavLink>
          </li>}
          {user === null ?
            <>
              <li>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </li>
            </> :
            <li>
            <LogoutButton />
          </li>
          }
          </li>
      </ul>
    </nav>
  );
}

export default NavBar;
