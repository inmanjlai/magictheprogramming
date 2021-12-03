import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import './user.css'

function User() {
  const [user, setUser] = useState({});
  const [decks, setDecks] = useState({})
  const { userId }  = useParams();

  const loggedInUser = useSelector((state) => state.session.user)
  const history = useHistory()

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
    
    (async () => {
      const response = await fetch(`/api/users/${userId}/decks/`);
      const decks = await response.json();
      setDecks(decks);
    })();
  }, [userId]);

  console.log(decks, "DECKS")
  console.log(user, "USER")

  if (!user) {
    return null;
  }

  const deckComponent = decks?.decks?.map((deck) => {
    return (
        <div className="grid-item-container-user">
            <div onClick={() => history.push(`/decks/${deck.id}`)} className='gridItemUser' key={deck.id}>
                <div className='deck-name'>{deck?.name}</div>
                <div className='commander-name'>{deck?.commander?.name}</div>
                <img id='grid-item-background' src={deck?.commander?.art_crop} alt="commander" />
            </div>
        </div>
    );
  });

  return (
    <div className='justify-content-center'>
      <div className='user-page'>
        <div className='users-details'>
          <h1>{user.username}</h1>
          <h5>{user.email}</h5>
          <h4 className='profile-bio'>Proflie Bio</h4>
          <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh.</p>
        </div>

        <div className='users-decks'>
          <div className='gridContainerUser'>
            {deckComponent}
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;
