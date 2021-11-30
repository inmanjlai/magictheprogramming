import { useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { editOneDeck, getOneDeck } from "../../store/deck"
import { changeDecksCommander } from "../../store/decklist"

const EditDeck = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    
    const deck = useSelector((state) => state.decks)[0]
    
    const [name, setName] = useState('')
    const [commander, setCommander] = useState('')
    const [newCommander, setNewCommander] = useState("")
    const [description, setDescription] = useState('')
    const [visibility, setVisibilty] = useState(false)
    const [results, setResults] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        dispatch(getOneDeck(params.deckId))
        setName(deck?.name)
        setCommander(deck?.commander)
        setNewCommander(deck?.commander?.card_info?.name)
        setDescription(deck?.description)
        setVisibilty(deck?.private)

        console.log(commander)
        console.log(newCommander, "NEW COMMANDERS")
    }, [deck?.id, deck?.name, deck?.private, deck?.description, dispatch, params.deckId])

    useEffect(() => {
        (async() => {
            const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${search}`)
            const data = await response.json()
            setResults(data.data)
        })();

    }, [search]) // 
    
    const handleEditDeck = async(e) => {
        e.preventDefault()
        const formData = {
            "name": name,
            "commander_id": newCommander?.card?.id,
            "description": description,
            "private": visibility
        }
        console.log(formData, "HEREERERERE")
        // dispatch to create a deck taking in a form data
        const returnedDeckId = await dispatch(editOneDeck(formData, params.deckId))
        history.push(`/decks/${returnedDeckId}`)
    }

    // SEARCH BAR IMPLEMENTATION
    const handleCreateCommander = async(e) => {
        // We want to create this card in the database, and return the card itself from the dispatch
        // use the card.card_info.id to be the commander_id when we create the deck
        const commander = await dispatch(changeDecksCommander(params.deckId, e.target.innerText))
        setNewCommander(commander)
        console.log(newCommander)
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
                    { newCommander === commander?.card_info?.name ? (<form onSubmit={handleSubmit}>
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
                    </form>) : <h3>{newCommander?.card?.name}</h3>}
                </div>
    )

    if (!deck?.name) {
        return null
    }
    else {
        return (
            <div>
                <form onSubmit={handleEditDeck}>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Deck name"
                    />
                    <input type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <label htmlFor="visibility">Private</label>
                    <input type="checkbox" checked={visibility} id="visibility" value={visibility} onChange={(e) => setVisibilty(!visibility)} />
                    <button>Edit Deck</button>
                </form>
                {searchBar}
            </div>   
        )
    }
}

export default EditDeck
