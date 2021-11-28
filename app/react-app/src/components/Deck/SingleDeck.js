import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOneDeck, getOneDeck } from '../../store/deck'
import { addOneCard, getOneDecklist, removeAllOfOneCard, removeOneCard } from '../../store/decklist'
import { addOneComment, getAllComments, removeOneComment } from '../../store/comment'


const SingleDeck = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()

    useEffect(() => {
        dispatch(getOneDeck(params.deckId))
        dispatch(getOneDecklist(params.deckId))
        dispatch(getAllComments(params.deckId))
    }, [dispatch, params.deckId])

    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const [comment, setComment] = useState('')

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

    // THIS IS HOW WE CAN SEPERATE CARDS INTO CATEGORIES ->
    // const enchantments = decklist?.filter((card) => card?.card_info?.type_line.includes("Enchantment"))
    // console.log(enchantments, "ENCHANTMENTS")

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleCreateComment = (e) => {
        e.preventDefault()
        const formData = {
            "deck_id": params?.deckId,
            "user_id": user?.id,
            "content": comment
        }
        //dispatch create a comment
        dispatch(addOneComment(formData))
        setComment('');
    }

    const handleAddCard = (e) => {
        // We want to dispatch the deck id and the exact card name (e.target.innerText)
        dispatch(addOneCard(params.deckId, e.target.innerText))
        setSearch('')
    }

    const handleDeleteCard = (cardId) => {
        // Dispatch to delete one card
        dispatch(removeOneCard(params.deckId, cardId))
    }

    const handleDeleteAllCopies = (cardId) => {
        dispatch(removeAllOfOneCard(params.deckId, cardId))
    }

    const handleDeleteComment = (commentId) => {
        dispatch(removeOneComment(commentId, params.deckId))
    }

    const handleDeleteDeck = () => {
        // dispatch delete One Deck passing in params.deckId
        dispatch(deleteOneDeck(params.deckId))
        history.push("/decks")
    }

    const decklistComponent = decklist.map((card) => {
        return (
            <div key={card.card_info.id}>
                <li>{card.card_info.name} - {card.quantity}</li>
                <img src={card.card_info.image_url} alt="card_image" style={{height: "300px"}} />
                <button onClick={() => handleDeleteCard(card.card_info.id)}>Remove one</button>
                {card.quantity > 1 && (
                    <button onClick={() => handleDeleteAllCopies(card.card_info.id)}>Remove all</button>
                )}
            </div>
        )
    })

    const commentsComponent = comments.map((comment) => {
        return (
            <li key={comment?.id}>
                <div>
                    {comment?.user?.username} said:
                </div>
                {comment?.content}
                {comment?.user?.id === user?.id && (
                    <button onClick={() => handleDeleteComment(comment?.id)}>Delete</button>
                )}
            </li>
        )
    })

    const searchResults = results.map((card) => {
       return <li onClick={handleAddCard} key={card}>{card}</li>
    })

    return (
        <div>

            {decklistComponent && <h3>{deck?.owner.username}'s Deck</h3>}
            {decklistComponent && (user?.id === deck?.owner_id) && (
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
                {user?.id === deck?.owner_id && <button onClick={handleDeleteDeck}>Delete deck</button>}
            </ul>

            <h3>Decklist</h3>
            <ul>
                {decklistComponent}
            </ul>

            <h3>Comments</h3>
            {user?.id && (
                <form onSubmit={handleCreateComment}>
                    <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    >
                    </textarea>
                    <button>Post</button>
                </form>
            )}
            <ul>
                {commentsComponent}
            </ul>
        </div>
    )
}

export default SingleDeck
