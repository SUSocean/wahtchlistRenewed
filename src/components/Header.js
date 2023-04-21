import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom"

const Header = () => {
    const { pathname } = useLocation()

    let headline =
        pathname == '/' ? 'Find Your Movie'
            : pathname == '/watchlist' ? 'My Watchlist'
                : 'Everything About'

    return (
        <header className="header">
            <h1 className="visually-hidden">Watchlist, find your films</h1>
            <nav className='header--navigation'>
                <h2 className='header--headline'>{headline}</h2>
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