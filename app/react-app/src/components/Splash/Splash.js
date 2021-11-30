import './Splash.css'
import SplashNav from './SplashNav/SplashNav'

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

            </div>
            <div className="footer"></div>
        </>
        
    )
}

export default Splash
