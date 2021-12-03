import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Deck from './components/Deck';
import SingleDeck from './components/Deck/SingleDeck';
import CreateDeck from './components/Deck/CreateDeck';
import EditDeck from './components/Deck/EditDeck';
import Splash from './components/Splash/Splash';
import SplashNav from './components/Splash/SplashNav/SplashNav';
import Footer from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
 
  return (
    <BrowserRouter>
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <NavBar />
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          <Splash />
        </Route>

        {/* CUSTOM ROUTES */}
        <Route path='/decks' exact={true}>
          <NavBar />
          <Deck />
        </Route>

        <Route path='/decks/:deckId' exact={true}>
          <NavBar />
          <SingleDeck />
        </Route>

        <ProtectedRoute path='/new-deck' exact={true} >
          <NavBar />
          <CreateDeck />
        </ProtectedRoute>

        <ProtectedRoute path='/decks/:deckId/edit' exact={true} >
          <NavBar />
          <EditDeck />
        </ProtectedRoute>

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
