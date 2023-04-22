import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Leyout = () => {
    let isDarkTheme = JSON.parse(localStorage.getItem('darkTheme'))
    return (
        <>
            <Header />
            <main className={`main ${isDarkTheme ? 'darktheme' : ''}`}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Leyout