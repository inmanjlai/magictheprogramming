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
    const [format, setFormat] = useState('')
    const [description, setDescription] = useState('')
    const [visibility, setVisibilty] = useState(false)
    
    useEffect(() => {
        dispatch(getOneDeck(params.deckId))
        setName(deck?.name)
        setFormat(deck?.format)
        setDescription(deck?.description)
        setVisibilty(deck?.private)
    }, [deck?.id, deck?.name, deck?.format, deck?.private, deck?.description, dispatch, params.deckId])
    
    const handleEditDeck = async(e) => {
        e.preventDefault()
        const formData = {
            "name": name,
            "format": format,
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
                    <input type="text"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        placeholder="Format"
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
