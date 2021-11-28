import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({});
  const [decks, setDecks] = useState({})
  const { userId }  = useParams();

  const loggedInUser = useSelector((state) => state.session.user)

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

  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <li>
       <strong>
        Decks:
       </strong>
       <ul>
          {decks?.decks?.map((deck) => {
            if((deck.private === true) && (deck.owner_id !== loggedInUser.id)) return null
            return (
              <li>
                <NavLink to={`/decks/${deck.id}`}>{deck.name}</NavLink>
              </li>
            )
          })}
       </ul>
      </li>
    </ul>
  );
}
export default User;
