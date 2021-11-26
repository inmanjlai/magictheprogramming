import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneDeck } from '../../store/deck'
import { getOneDecklist } from '../../store/decklist'


const SingleDeck = () => {

    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(getOneDeck(params.deckId))
        dispatch(getOneDecklist(params.deckId))
    }, [dispatch, params.deckId])

    const deck = useSelector((state) => state.decks)[0]
    const user = useSelector((state) => state.session.user)
    const decklist = useSelector((state) => state.decklist)

    console.log(deck?.owner_id, user?.id)

    const decklistComponent = decklist.map((card) => {
        return (
            <div key={card.card_info.id}>
                <li>{card.card_info.name} | {card.quantity}</li>
                <img src={card.card_info.image_url} alt="card_image" style={{height: "300px"}} />
            </div>
        )
    })

    return (
        <div>

            {decklistComponent && (user.id === deck.owner_id) && <h3>{deck.owner.username}'s Deck</h3>}

            <ul>
                <li>{deck?.name}</li>
                <li>{deck?.created_at}</li>
            </ul>

            <h3>Decklist</h3>
            <ul>
                {decklistComponent}
            </ul>
        </div>
    )
}

export default SingleDeck
