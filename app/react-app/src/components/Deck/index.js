import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllDecks } from "../../store/deck"
import {NavLink} from 'react-router-dom'

const Deck = () => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch to get a list of all decks that are public
        dispatch(getAllDecks())
    }, [dispatch])

    // use a useSelector to select decks from our slice of state and store it in a variable
    const decks = useSelector((state) => state.decks)
    const deckComponent = decks.map((deck) => {
        return (
          <li key={deck.id}>
            <NavLink to={`/decks/${deck.id}`}>{deck.name}</NavLink>
          </li>
        );
      });

    return (
        // return a div with the deck name for each deck in decks variable
        <div>
            <ul>
                {deckComponent}
            </ul>
        </div>
    )
}

export default Deck
