import { useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { editOneDeck, getOneDeck } from "../../store/deck"

import exit from '../../images/close.svg'

const EditDeck = ({onClose}) => {

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
        onClose()
        history.push(`/decks/${returnedDeckId}`)
    }

    if (!deck?.name) {
        return null
    }
    else {
        return (
            <form className='deck-form' onSubmit={handleEditDeck}>
                <div className="deck-header">
                    <h3 className='deck-title'>Edit Deck</h3>
                    <img className='close-modal' onClick={onClose} src={exit} alt="X" />
                </div>
                <div className="deck-content">
                    <div className="content-item">
                        <h5>Name</h5>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Deck name"
                        />
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
                        <label for="visibility">Private</label>
                        <input type="checkbox" checked={visibility} id="visibility" value={visibility} onChange={(e) => setVisibilty(!visibility)} />
                    </div>
                    <button>Edit Deck</button>
                </div>
            </form>
        )
    }
}

export default EditDeck
