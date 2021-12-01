import { useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { editOneDeck, getOneDeck } from "../../store/deck"

const EditDeck = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    
    const deck = useSelector((state) => state.decks)[0]
    
    const [name, setName] = useState('')
    const [commander, setCommander] = useState('')
    const [description, setDescription] = useState('')
    const [visibility, setVisibilty] = useState(false)

    console.log(deck?.commander?.name)
    
    useEffect(() => {
        dispatch(getOneDeck(params.deckId))
        setName(deck?.name)
        setCommander(deck?.commander)
        setDescription(deck?.description)
        setVisibilty(deck?.private)
    }, [deck?.id, deck?.name, deck?.private, deck?.description, dispatch, params.deckId])
    
    const handleEditDeck = async(e) => {
        e.preventDefault()
        const formData = {
            "name": name,
            "commander_id": commander.id,
            "description": description,
            "private": visibility
        }
        // dispatch to create a deck taking in a form data
        const returnedDeckId = await dispatch(editOneDeck(formData, params.deckId))
        history.push(`/decks/${returnedDeckId}`)
    }

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
            </div>   
        )
    }
}

export default EditDeck
