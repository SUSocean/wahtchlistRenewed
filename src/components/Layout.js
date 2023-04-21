import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Leyout = () => {
    return (
        <>
            <Header />
            <main className='main'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Leyout