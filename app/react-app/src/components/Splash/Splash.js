import './Splash.css'
import SplashNav from './SplashNav/SplashNav'
import searchIcon from '../../images/search.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllDecksReverse } from '../../store/deck'
import { useHistory, useParams } from 'react-router-dom'

const Splash = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    
    useEffect(() => {
        dispatch(getAllDecksReverse())
    }, [dispatch])
    
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    useEffect(() => {
        (async() => {
            const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${search}`)
            const data = await response.json()
            setResults(data.data)
        })();

    }, [search]) 
    
    const decks = useSelector((state) => state.decks)

    const handleCardReroute = (e) => {
        // We want to reroute to a single card page
        setSearch('')
    }

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

      const searchResults = results.map((card) => {
        return <li onClick={handleCardReroute} key={card}>{card}</li>
     })

      const searchComponent = (
        <div className='search'>
            <div className="drop-down2">
                <div className="search-and-icon">
                    <div className="iconContainer">
                        <img src={searchIcon} alt="" />
                    </div>
                    <input 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for a Magic card"
                    />
                </div>
                <div className='search-results2'>
                    {results.length > 0 && (
                        <ul>
                            {searchResults}
                        </ul>
                    )}
                </div>
            </div>
        </div>
      )

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
                    {/* <div className="search">
                        <div className="iconContainer">
                            <img src={searchIcon} alt="" />
                        </div>
                        <input type="text" placeholder='Search for decks, cards, or users' />
                    </div> */}
                    {searchComponent}
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
