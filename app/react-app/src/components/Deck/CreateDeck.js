import { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { createOneDeck } from "../../store/deck"
import { createCard } from "../../store/decklist"

const CreateDeck = () => {

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
                            placeholder="Commander"
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
        <div>
            <form onSubmit={handleCreateDeck}>
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
                {searchBar}
                <label htmlFor="visibility">Private</label>
                <input type="checkbox" id="visibility" value={visibility} onChange={(e) => setVisibilty(!visibility)} />
                <button>Create Deck</button>
            </form>
        </div>
    )
}

export default CreateDeck
