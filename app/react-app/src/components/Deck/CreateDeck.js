import { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { createOneDeck } from "../../store/deck"
import { createCard } from "../../store/decklist"

import exit from '../../images/close.svg'

import './CreateDeck.css'


const CreateDeck = ({onClose}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()

    const [name, setName] = useState("")
    const [commander, setCommander] = useState(null)
    const [description, setDescription] = useState("")
    const [visibility, setVisibilty] = useState(false)
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        (async() => {
            const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${search}`)
            const data = await response.json()
            setResults(data.data)
        })();

    }, [search]) // 

    const handleCreateDeck = async(e) => {
        e.preventDefault()
        const formData = {
            "name": name,
            "commander_id": commander.card.id,
            "description": description,
            "owner_id": user.id,
            "private": visibility
        }
        // dispatch to create a deck taking in a form data
        const returnedDeckId = await dispatch(createOneDeck(formData))
        history.push(`/decks/${returnedDeckId}`)
    }


    // SEARCH BAR IMPLEMENTATION
    const handleCreateCommander = async(e) => {
        // We want to create this card in the database, and return the card itself from the dispatch
        // use the card.card_info.id to be the commander_id when we create the deck
        const commander = await dispatch(createCard(e.target.innerText))
        setCommander(commander)
        setSearch('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const searchResults = results.map((card) => {
        return <li onClick={handleCreateCommander} key={card}>{card}</li>
     })

     const searchBar = (
        <div>
            { commander === null ? (<form onSubmit={handleSubmit}>
                <input 
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a Commander"
                    />
                <div>
                    {results.length > 0 && (
                        <ul>
                            {searchResults}
                        </ul>
                    )}
                </div>
            </form>) : <h3>{commander?.card?.name}</h3>}
        </div>
    )

    return (
        <>
        <form className='deck-form' onSubmit={handleCreateDeck}>
            <div className="deck-header">
                <h3 className='deck-title'>Add Deck</h3>
                <img className='close-modal' onClick={onClose} src={exit} alt="X" />
            </div>
            <div className="deck-content">
                <div className="content-item">
                    <h5>Name</h5>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Deck Name"
                    />
                </div>
                <div className="content-item">
                    <h5>Commander</h5>
                    {searchBar}
                </div>
                <div className="content-item">
                    <h5>Description</h5>
                    <textarea type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Deck Description"
                    />
                </div>
            </div>
            <div className="deck-footer">
                <div className="footer-checkbox">
                    <h5>Private</h5>
                    <input type="checkbox" id="visibility" value={visibility} onChange={(e) => setVisibilty(!visibility)} />
                </div>
                <button>Create</button>
            </div>
        </form>
        </>
    )
}

export default CreateDeck
