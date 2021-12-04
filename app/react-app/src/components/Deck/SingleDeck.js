import { useParams, useHistory, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOneDeck, getOneDeck } from '../../store/deck'
import { addOneCard, getOneDecklist, removeAllOfOneCard, removeOneCard } from '../../store/decklist'
import { addOneComment, getAllComments, removeOneComment } from '../../store/comment'
import dropdown from '../../images/dropdown.svg'
import garbage from '../../images/delete.svg'
import './SingleDeck.css'
import Modal from '../Modal/Modal'
import EditDeck from './EditDeck'

const SingleDeck = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()
    
    const deck = useSelector((state) => state.decks)[0]
    const commander = {"card_info": deck?.commander}
    const decklist = useSelector((state) => state.decklist)
    const [currentCard, setCurrentCard] = useState(commander)
    const [deckId, setDeckId] = useState(1)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setDeckId(params.deckId)
        dispatch(getOneDeck(deckId))
        dispatch(getOneDecklist(deckId))
        dispatch(getAllComments(deckId))
        setCurrentCard(commander)
        // console.log(params.deckId, '<-------------------PARAMS------------------>')
    }, [dispatch, params.deckId, commander?.card_info?.image_url])

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

    

    const user = useSelector((state) => state.session.user)
    const comments = useSelector((state) => state.comments)
    
    const findDeckSize = (decklist) => {
        let count = 0;
        for (let card of decklist) {
            count += card.quantity;
        }
        return count;
    }

    // useEffect(() => {
    //     dispatch(getOneDecklist(params.deckId))
    //     console.log(params.deckId, '<-------------------SECOND ####@@@2222 PARAMS------------------>')
    //     console.log(decklist)
    // }, [dispatch, params.deckId, commander?.card_info?.image_url])

    const maxColumnSize = 55
    
    // THIS IS HOW WE CAN SEPERATE CARDS INTO CATEGORIES ->
    
   

    const creatures = decklist?.filter((card) => card?.card_info?.type_line.includes("Creature") && !(card?.card_info?.name?.includes(commander?.card_info?.name)))
    const planeswalkers = decklist?.filter((card) => card?.card_info?.type_line.includes("Planeswalker"))
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
    
    // const handleEditDeck = () => {
    //     history.push(`/decks/${params.deckId}/edit`)
    //     // dispatch edit One Deck passing in params.deckId
    // }

    const displayDropdown = (card, element) => {
        const content = document.querySelector(`.card${card?.card_info?.id}`)
        // if (element.src === '../../images/dropdown.svg') element.src = '../../images/cancel.svg'
        // else element.src = '../../images/dropdown.svg'
        content.classList.toggle("shown")
    }

    const decklistComponent = (type) => type.map((card) => {
        return (
            <div key={card.card_info.id}>

                {/* SHOWS A CARD'S NAME, QUANTITY AND OPTION TO REMOVE IT FROM THE DECK */}
                <li className='card' onMouseOver={(e) => setCurrentCard(card)}>{card?.quantity} <span>{card?.card_info.name}</span> 
                    <div className='card-dropdown'>
                        <img src={dropdown} alt="dropdown-card" 
                            onClick={(e) => {
                                displayDropdown(card, e.target)
                            }}
                        />

                        {/* dropdown menu to interact with cards */}
                        <div className={`card${card?.card_info?.id} dropdown-content`}>
                            {deck?.owner_id === user?.id && 
                            <span className='card-controls' onClick={() => handleDeleteCard(card.card_info.id)}>Remove</span>}

                            {card.quantity > 1 && deck.owner_id === user?.id && (
                                <span className='card-controls' onClick={() => handleDeleteAllCopies(card.card_info.id)}>Remove all</span>)} 
                        </div>

                    </div>
                </li>
            </div>
        )
    })

    const cardsInDeckNew = (
        <div className='decklist-container'>
            <div className="columnOne">
                {/* COMMANDER / PLANESWALKERS / CREATURES WILL ALWAYS BE IN COLUMN ONE */}
                <div className="singleType" key={commander?.card_info?.id}>
                    <h3>Commander</h3>
                    <li onMouseOver={(e) => setCurrentCard(commander)} className="card">1 <span>{commander?.card_info?.name}</span></li>
                </div>   

                {planeswalkers.length > 0 && <div className='singleType'>
                    <h3>Planeswalkers ({findDeckSize(planeswalkers)})</h3>
                    {decklistComponent(planeswalkers)}
                </div>}

                {creatures.length > 0 && <div className="singleType">
                    <h3>Creatures ({findDeckSize(creatures)})</h3>
                    {decklistComponent(creatures)}
                </div>}

                {!((planeswalkers.length + creatures.length + sorceries.length + 1) > maxColumnSize) && sorceries.length > 0 && 
                    <div className="singleType">
                        <h3>Sorceries ({findDeckSize(sorceries)})</h3>
                        {decklistComponent(sorceries)}
                    </div>
                }
                
                {!((planeswalkers.length + creatures.length + sorceries.length + instants.length + 1) > maxColumnSize)  && instants.length > 0 &&
                    <div className="singleType">
                        <h3>Instants ({findDeckSize(instants)})</h3>
                        {decklistComponent(instants)}
                    </div>
                }
                
                {!((planeswalkers.length + creatures.length + sorceries.length + instants.length + enchantments.length + 1) > maxColumnSize)  && enchantments.length > 0 &&
                    <div className="singleType">
                        <h3>Enchantments ({findDeckSize(enchantments)})</h3>
                        {decklistComponent(enchantments)}
                    </div>
                }
                
                {!((planeswalkers.length + creatures.length + sorceries.length + instants.length + enchantments.length + artifacts.length + 1) > maxColumnSize)  && artifacts.length > 0 &&
                    <div className="singleType">
                        <h3>Artifacts ({findDeckSize(artifacts)})</h3>
                        {decklistComponent(artifacts)}
                    </div>
                }
                
                {!((planeswalkers.length + creatures.length + sorceries.length + instants.length + enchantments.length + artifacts.length + lands.length + 1) > maxColumnSize)  && lands.length > 0 &&
                    <div className="singleType">
                        <h3>Lands ({findDeckSize(lands)})</h3>
                        {decklistComponent(lands)}
                    </div>
                }

            </div>

            <div className="columnTwo">
                {((planeswalkers.length + creatures.length + sorceries.length + 1) > maxColumnSize)  && sorceries.length > 0 &&
                        <div className="singleType">
                            <h3>Sorceries ({findDeckSize(sorceries)})</h3>
                            {decklistComponent(sorceries)}
                        </div>
                }
                
                {((planeswalkers.length + creatures.length + sorceries.length + instants.length + 1) > maxColumnSize)  && instants.length > 0 &&
                    <div className="singleType">
                        <h3>Instants ({findDeckSize(instants)})</h3>
                        {decklistComponent(instants)}
                    </div>
                }

                {((planeswalkers.length + creatures.length + sorceries.length + instants.length + enchantments.length + 1) > maxColumnSize)  && enchantments.length > 0 && 
                    <div className="singleType">
                        <h3>Enchantments ({findDeckSize(enchantments)})</h3>
                        {decklistComponent(enchantments)}
                    </div>
                }

                {((planeswalkers.length + creatures.length + sorceries.length + instants.length + enchantments.length + artifacts.length + 1) > maxColumnSize)  && artifacts.length > 0 &&
                    <div className="singleType">
                        <h3>Artifacts ({findDeckSize(artifacts)})</h3>
                        {decklistComponent(artifacts)}
                    </div>
                }

                {((planeswalkers.length + creatures.length + sorceries.length + instants.length + enchantments.length + artifacts.length + lands.length + 1) > maxColumnSize)  && lands.length > 0 &&
                    <div className="singleType">
                        <h3>Lands ({findDeckSize(lands)})</h3>
                        {decklistComponent(lands)}
                    </div>
                }
            </div>
        </div>
    )

    const commentsComponent = comments.map((comment) => {
        return (
            <li key={comment?.id}>
                <p className='comment-body'>
                    {comment?.content}
                </p>
                <div className='comment-user'>
                    <p>Posted by <NavLink to={`/users/${comment?.user?.id}`}>{comment?.user?.username}</NavLink></p> •
                    {comment?.user?.id === user?.id && (
                        <div className='delete-div' onClick={() => handleDeleteComment(comment?.id)}>
                            <img src={garbage} alt="garbagecan" />
                            <p className='comment-controls'>Delete</p>
                        </div>
                )}
                </div>
                
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
            {user?.id === deck?.owner_id && <button className='editBtn' onClick={() => setIsOpen(true)}>Edit deck</button>}
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <EditDeck onClose={() => setIsOpen(false)}/>
            </Modal>
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
                    <img src={commander?.card_info?.art_crop} className='showcase-image' alt="showcase" />
                    <div className='gradient'></div>
                </div>
            </div>


            {/* SEARCH BAR TO FIND AND ADD CARDS TO YOUR DECK */}
            {decklistComponent && (user?.id === deck?.owner_id) && (
                searchBar
            )}
            <div className="cards-area">
                <div className='card-display'>
                    <img src={currentCard?.card_info?.image_url} alt="currentCard"/>
                    {/* <h4>{currentCard?.card_info?.name}</h4>
                    <p>{currentCard?.card_info?.oracle_text}</p> */}
                </div>
                    {/* {cardsInDeck} */}
                    {decklist && cardsInDeckNew}
            </div>

            <div className='deck-size'>
                <p>{findDeckSize(decklist)} / 100 cards in deck</p>
                    <ul className='type-amounts'>
                        <li>Creatures: {findDeckSize(creatures)}</li>
                        <li>Artifacts: {findDeckSize(artifacts)} </li>
                        <li>Planeswalkers: {findDeckSize(planeswalkers)} </li>
                        <li>Enchantments: {findDeckSize(enchantments)} </li>
                        <li>Lands: {findDeckSize(lands)} </li>
                        <li>Instants: {findDeckSize(instants)} </li>
                        <li>Sorceries: {findDeckSize(sorceries)}</li>
                    </ul>
            </div>
            

            {user?.id && (
                <form onSubmit={handleCreateComment} className='comment-form'>
                    <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a witty comment..."
                    >
                    </textarea>
                    <button>Post Comment</button>
                </form>
            )}
            <ul className='comments-list'>
                {commentsComponent}
            </ul>
        </div>
    )
}

export default SingleDeck
