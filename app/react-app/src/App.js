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
      <NavBar />
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>

        {/* CUSTOM ROUTES */}
        <Route path='/decks' exact={true}>
          <h2>See a list of decks</h2>
          <Deck />
        </Route>

        <Route path='/decks/:deckId' exact={true}>
          <h2>See one deck and all its details</h2>
          <SingleDeck />
        </Route>

        <ProtectedRoute path='/new-deck' exact={true} >
          <h1>Create a deck</h1>
          <CreateDeck />
        </ProtectedRoute>

        <ProtectedRoute path='/decks/:deckId/edit' exact={true} >
          <h1>Edit deck</h1>
          <EditDeck />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
