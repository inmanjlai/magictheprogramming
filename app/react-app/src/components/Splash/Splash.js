import './Splash.css'
import SplashNav from './SplashNav/SplashNav'
import searchIcon from '../../images/search.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllDecks } from '../../store/deck'
import { useHistory } from 'react-router-dom'

const Splash = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllDecks())
    }, [dispatch])

    
    const decks = useSelector((state) => state.decks.reverse())
    const deckComponent = decks?.map((deck) => {
        return (
          <>
            <div className="grid-item-container">
                <div onClick={() => history.push(`/decks/${deck.id}`)} className='gridItem' key={deck.id}>
                    <div className='deck-name'>{deck?.name}</div>
                    <div className='commander-name'>{deck?.commander?.name}</div>
                    <img id='grid-item-background' src={deck?.commander?.art_crop} alt="commander" />
                </div>
                <div className="splash-user">
                    <span className='username' onClick={() => history.push(`/users/${deck.owner_id}`)}>{deck?.owner?.username}</span>
                    <span>{deck?.created_at}</span>
                </div>
            </div>
          </>  
        );
      });

    return (
        <>
            <div className='hero-bg'>
                <img src='https://www.moxfield.com/img/hero-bg.jpg' alt="mox" />
            </div>
            <div className="navContainer">
                <SplashNav />
            </div>
            <div className="mainContainer">
                <div className="hero">
                    <div className="title">Deck Building made easy.</div>
                    <div className="subtitle">Build your Commander Deck for Magic: the Gathering. </div>
                    <div className="search">
                        <div className="iconContainer">
                            <img src={searchIcon} alt="" />
                        </div>
                        <input type="text" placeholder='Search for decks, cards, or users' />
                    </div>
                </div>
                <div className="splashDecksContainer">
                    <div className="latestDecks">
                        <div className="latestTitle">OUR LATEST DECKS</div>
                        <div className="justify-content-center">
                            <div className="gridContainer">
                                {deckComponent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer"></div>
        </>
        
    )
}

export default Splash
