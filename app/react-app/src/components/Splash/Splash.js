import './Splash.css'
import SplashNav from './SplashNav/SplashNav'
import searchIcon from '../../images/search.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllDecks } from '../../store/deck'
import { NavLink, useHistory } from 'react-router-dom'

const Splash = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllDecks())
    }, [dispatch])

    const decks = useSelector((state) => state.decks)
    const deckComponent = decks?.map((deck) => {
        return (
          <div onClick={() => history.push(`/decks/${deck.id}`)} className='gridItem' key={deck.id}>
            <NavLink to={`/decks/${deck.id}`}>{deck.name}</NavLink>
          </div>
        );
      });

    return (
        <>
            <div className='hero-bg'>
                <img src='https://www.moxfield.com/img/hero-bg.jpg' alt="" />
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
