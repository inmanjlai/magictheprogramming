
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import './SplashNav.css'
import logo from "../../../images/untitled.png"
import Modal from '../../Modal/Modal';
import CreateDeck from '../../Deck/CreateDeck';

const SplashNav = () => {

  const user = useSelector((state) => state.session.user)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='nav'>
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
            <div className='modal' onClick={() => setIsOpen(true)}>Create Deck</div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <CreateDeck onClose={() => setIsOpen(false)}/>
            </Modal>
            {/* <NavLink to='/new-deck' exact={true} activeClassName='active'>
              Create a deck
            </NavLink> */}
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
            <li className='splash-log'>
            <LogoutButton />
          </li>
          }
        </li>
      </ul>
    </div>
  );
}

export default SplashNav;
