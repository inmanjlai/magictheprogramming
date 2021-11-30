import './Splash.css'
import SplashNav from './SplashNav/SplashNav'
import searchIcon from '../../images/search.svg'

const Splash = () => {
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
                <div className="recentDecks"></div>
            </div>
            <div className="footer"></div>
        </>
        
    )
}

export default Splash
