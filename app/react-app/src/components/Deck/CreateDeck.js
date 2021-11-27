import { useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { createOneDeck } from "../../store/deck"

const CreateDeck = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState("")
    const [format, setFormat] = useState("")
    const [description, setDescription] = useState("")
    const [visibility, setVisibilty] = useState(false)

    const user = useSelector((state) => state.session.user)

    const handleCreateDeck = async(e) => {
        e.preventDefault()
        const formData = {
            "name": name,
            "format": format,
            "description": description,
            "owner_id": user.id,
            "private": visibility
        }
        // dispatch to create a deck taking in a form data
        const returnedDeckId = await dispatch(createOneDeck(formData))
        history.push(`/decks/${returnedDeckId}`)
    }

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
                <input type="text"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    placeholder="Format"
                />
                <label htmlFor="visibility">Private</label>
                <input type="checkbox" id="visibility" value={visibility} onChange={(e) => setVisibilty(!visibility)} />
                <button>Create Deck</button>
            </form>
        </div>
    )
}

export default CreateDeck
