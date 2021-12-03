import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllDecks } from "../../store/deck"
import {useHistory} from 'react-router-dom'

const Deck = () => {
    
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        // dispatch to get a list of all decks that are public
        dispatch(getAllDecks())
    }, [dispatch])

    // use a useSelector to select decks from our slice of state and store it in a variable
    const decks = useSelector((state) => state.decks)
    // const deckComponent = decks?.map((deck) => {
    //     return (
    //       <li key={deck.id}>
    //         <NavLink to={`/decks/${deck.id}`}>{deck.name}</NavLink>
    //       </li>
    //     );
    //   });

    const deckComponent = decks?.map((deck) => {
      return (
        <>
          <div className="grid-item-container">
              <div onClick={() => history.push(`/decks/${deck.id}`)} className='gridItem' key={deck.id}>
                  <div className='deck-name'>{deck?.name}</div>
                  <div className='commander-name'>{deck?.commander?.name}</div>
                  <img id='grid-item-background' src={deck?.commander?.art_crop} alt="commander" />
              </div>
              <div className="splash-user">
                  <span className='username' onClick={() => history.push(`/users/${deck.owner_id}`)}>{deck?.owner?.username}</span>
                  <span>{deck?.created_at}</span>
              </div>
          </div>
        </>  
      );
    });

    return (
        // return a div with the deck name for each deck in decks variable
      <div className="splashDecksContainer">
        <div className="latestTitle mgt50">PUBLIC DECKS</div>
        <div className="justify-content-center">
            <div className="gridContainer">
                {deckComponent}
            </div>
        </div>
      </div>
    )
}

export default Deck
