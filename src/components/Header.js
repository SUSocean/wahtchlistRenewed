import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const { pathname } = useLocation()

    if (!localStorage.getItem('darkTheme')) {
        localStorage.setItem('darkTheme', JSON.stringify(false))
    }

    let isDarkTheme = JSON.parse(localStorage.getItem('darkTheme'))
    return (
        <header className="header">
            <h1 className="visually-hidden">Watchlist, find your films</h1>
            <nav className='header--navigation'>
                <FontAwesomeIcon
                    className='theme-selector'
                    icon={isDarkTheme ? faMoon : faSun}
                    onClick={() => {
                        isDarkTheme = !isDarkTheme
                        localStorage.setItem('darkTheme', JSON.stringify(isDarkTheme))
                        window.location.reload()
                    }}
                />
                {pathname == '/' &&
                    <h2 className='header--headline' onClick={() => window.location.reload()}>
                        Find Your Movie</h2>}
                {pathname == '/watchlist' && <h2 className='header--headline'>My Watchlist</h2>}
                {pathname !== '/' && pathname !== '/watchlist' && <h2 className='header--headline'>Everything About</h2>}
                <ul className='header--navigation--list'>
                    <li className='header--navigation--list--item'>
                        <Link
                            to='/'
                            className='header--navigation--list--item-link'
                        >Search Movies</Link>
                    </li>
                    <li className='header--navigation--list--item'>
                        <Link
                            to='/watchlist'
                            className='header--navigation--list--item-link'
                        >My Watchlist</Link>
                    </li>
                </ul>

            </nav>
        </header>
    )
}

export default Header