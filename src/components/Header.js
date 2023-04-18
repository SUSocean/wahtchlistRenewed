import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="header">
            <h1 className="visually-hidden">Search for movies</h1>
            <nav className='header--navigation'>
                <h2 className='header--headline'>Find you Film</h2>
                <ul className='header--navigation--list'>
                    <li className='header--navigation--list--item'>
                        <Link
                            className='header--navigation--list--item-link'
                        >Search For Movies</Link>
                    </li>
                    <li className='header--navigation--list--item'>
                        <Link
                            className='header--navigation--list--item-link'
                        >My Watchlist</Link>
                    </li>
                </ul>

            </nav>
        </header>
    )
}

export default Header