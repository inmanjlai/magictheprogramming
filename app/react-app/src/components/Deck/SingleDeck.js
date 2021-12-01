import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOneDeck, getOneDeck } from '../../store/deck'
import { addOneCard, getOneDecklist, removeAllOfOneCard, removeOneCard } from '../../store/decklist'
import { addOneComment, getAllComments, removeOneComment } from '../../store/comment'
import './SingleDeck.css'

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
    
    const findDeckSize = (decklist) => {
        let count = 0;
        for (let card of decklist) {
            count += card.quantity;
        }
        return count;
    }
    
    // THIS IS HOW WE CAN SEPERATE CARDS INTO CATEGORIES ->
    
    const commander = deck?.commander
    const creatures = decklist?.filter((card) => card?.card_info?.type_line.includes("Creature") && !(card?.card_info?.name?.includes(commander?.name)))
    const artifacts = decklist?.filter((card) => card?.card_info?.type_line.includes("Artifact"))
    const sorceries = decklist?.filter((card) => card?.card_info?.type_line.includes("Sorcery"))
    const instants = decklist?.filter((card) => card?.card_info?.type_line.includes("Instant"))
    const enchantments = decklist?.filter((card) => card?.card_info?.type_line.includes("Enchantment"))
    const lands = decklist?.filter((card) => card?.card_info?.type_line.includes("Land"))


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
    
    const handleEditDeck = () => {
        history.push(`/decks/${params.deckId}/edit`)
        // dispatch edit One Deck passing in params.deckId
        
    }

    const decklistComponent = (type) => type.map((card) => {
        return (
            <div key={card.card_info.id}>

                {/* SHOWS A CARD'S NAME, QUANTITY AND OPTION TO REMOVE IT FROM THE DECK */}
                <li>{card?.card_info.name} - {card?.quantity} {deck?.owner_id === user?.id && <span onClick={() => handleDeleteCard(card.card_info.id)}>DELETE</span>}

                {card.quantity > 1 && deck.owner_id === user?.id && (
                    <span onClick={() => handleDeleteAllCopies(card.card_info.id)}>DELETE ALL</span>
                )}</li>
            </div>
        )
    })

    const cardsInDeck = (
        <ul className='decklist-cards'>
            <li>
                <h3>Commander</h3>
                <div key={commander?.card_info?.id}>

                {/* SHOWS A CARD'S NAME, QUANTITY AND OPTION TO REMOVE IT FROM THE DECK */}
                <li>{commander?.name}</li>
                </div>
            </li>
            <li>
                <h3>Creatures ({findDeckSize(creatures)})</h3>
                    {decklistComponent(creatures)}
            </li>
            <li>
                <h3>Artifacts({findDeckSize(artifacts)})</h3>
                    {decklistComponent(artifacts)}
            </li>
            <li>
                <h3>Enchantments({findDeckSize(enchantments)})</h3>
                    {decklistComponent(enchantments)}
            </li>
            <li>
                <h3>Sorceries({findDeckSize(sorceries)})</h3>
                    {decklistComponent(sorceries)}
            </li>
            <li>
                <h3>Instants({findDeckSize(instants)})</h3>
                    {decklistComponent(instants)}
            </li>
            <li>
                <h3>Lands({findDeckSize(lands)})</h3>
                    {decklistComponent(lands)}
            </li>
        </ul>
    )

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

    const searchBar = (
        <div className='search-bar'>
            <div className="drop-down">
                <input 
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a Magic card"
                />
                <div className='search-results'>
                    {results.length > 0 && (
                        <ul>
                            {searchResults}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )

    const userControls = (
        <span className='deck-controls'>
            {user?.id === deck?.owner_id && <button className='editBtn' onClick={handleEditDeck}>Edit deck</button>}
            {user?.id === deck?.owner_id && <button className='deleteBtn' onClick={handleDeleteDeck}>Delete deck</button>}
        </span>
    )


    return (
        <div>

            <div className="deck-details">
                <div className='text'>
                    <h1>{deck?.name}</h1>
                    <p>{deck?.description}</p>
                    <div><p><em>Crafted by</em> <strong>{deck?.owner.username}</strong> • {deck?.created_at}</p></div>
                    {userControls}
                </div>
                <div className='showcase'>
                    <img src={commander?.art_crop} className='showcase-image' alt="showcase" />
                    <div className='gradient'></div>
                </div>
            </div>


            {/* SEARCH BAR TO FIND AND ADD CARDS TO YOUR DECK */}
            {decklistComponent && (user?.id === deck?.owner_id) && (
                searchBar
            )}

            <div>
                <h3>Decklist ({findDeckSize(decklist)})</h3>
                {cardsInDeck}
            </div>

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
