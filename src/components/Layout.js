import { Outlet } from 'react-router-dom'
import Header from './Header'
import SearchMovieForm from '../features/searchedMovies/SearchMovieForm'
import Footer from './Footer'

const Leyout = () => {
    return (
        <>
            <Header />
            <SearchMovieForm />
            <main className='main'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Leyout