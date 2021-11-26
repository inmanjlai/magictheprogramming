import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneDeck } from '../../store/deck'
import { getOneDecklist } from '../../store/decklist'
import { getAllComments } from '../../store/comment'


const SingleDeck = () => {

    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(getOneDeck(params.deckId))
        dispatch(getOneDecklist(params.deckId))
        dispatch(getAllComments(params.deckId))
    }, [dispatch, params.deckId])

    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    useEffect(() => {
        (async() => {
            const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${search}`)
            const data = await response.json()
            setResults(data.data)
        })();

    }, [search]) // 

    const deck = useSelector((state) => state.decks)[0]
    const user = useSelector((state) => state.session.user)
    const decklist = useSelector((state) => state.decklist)
    const comments = useSelector((state) => state.comments)


    const handleSubmit = (e) => {
        e.preventDefault()

    }

    const decklistComponent = decklist.map((card) => {
        return (
            <div key={card.card_info.id}>
                <li>{card.card_info.name} | {card.quantity}</li>
                <img src={card.card_info.image_url} alt="card_image" style={{height: "300px"}} />
            </div>
        )
    })

    const commentsComponent = comments.map((comment) => {
        return (
            <li key={comment.id}>
                <div>
                    {comment.user.username} said:
                </div>
                {comment.content}
            </li>
        )
    })

    const searchResults = results.map((card) => {
       return <li>{card}</li>
    })

    return (
        <div>

            {decklistComponent && (user.id === deck?.owner_id) && <h3>{deck.owner.username}'s Deck</h3>}
            {decklistComponent && (user.id === deck?.owner_id) && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div>
                            {results.length > 0 && (
                                <ul>
                                    {searchResults}
                                </ul>
                            )}
                        </div>
                    </form>
                </div>
            )}


            <ul>
                <li>{deck?.name}</li>
                <li>{deck?.created_at}</li>
            </ul>

            <h3>Decklist</h3>
            <ul>
                {decklistComponent}
            </ul>

            <h3>Comments</h3>
            <ul>
                {commentsComponent}
            </ul>
        </div>
    )
}

export default SingleDeck
