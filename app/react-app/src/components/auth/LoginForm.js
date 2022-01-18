import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import icon from '../../images/logoIcon.png'

const LoginForm = () => {
  const history = useHistory()

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleDemo = () => {
    dispatch(login('demo@aa.io', 'password'));
  }

  return (
    <div className="sign-container">
      <div className="sign-hero">
        <img className='sign-hero-bg' src="https://www.moxfield.com/img/hero-bg.jpg" alt="hero" />
        <div className="to-home-container">
          <div onClick={() => history.push('/')} className='to-home'>
            <img className='sign-icon' src={icon} alt="logo" />
            <div className="sign-name">Upkeep</div>
          </div>
        </div>
        <div className="sign-title">Deck building made easy.</div>
        <div className="sign-subtitle">Build your Commander Deck for Magic: the Gathering. </div>
      </div>
      <div className="form-container">
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div className='redError' key={ind}>{error}</div>
              ))}
          </div>
          <div className="display-flicker form-home-container">
            <div className="demo-login"></div>
            <div onClick={() => history.push('/')} className='to-home'>
              <img className='sign-icon' src={icon} alt="logo" />
              <div className="sign-name">Upkeep</div>
            </div>
          </div>
          <h1>Log in to Upkeep</h1>
          <h3>Email</h3>
          <div className='form-item'>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              />
          </div>
          <h3>
            Password
          </h3>
          <div className='form-item'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              />
            <div className="switch">
              <button type='submit'>Login</button>
              <div>Don't have an account? <span onClick={() => history.push('/sign-up')}>Sign Up</span> or <span onClick={handleDemo}>Demo Login</span></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
