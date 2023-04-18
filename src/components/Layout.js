import { Outlet } from 'react-router-dom'
import Header from './Header'
import SearchMovieForm from '../features/searchedMovies/SearchMovieForm'

const Leyout = () => {
    return (
        <>
            <Header />
            <SearchMovieForm />
            <main className='main'>
                <Outlet />
            </main>
        </>
    )
}

export default Leyout