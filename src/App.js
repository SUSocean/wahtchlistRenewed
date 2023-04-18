import SearhedMoviesPage from "./features/searchedMovies/SearchMoviesPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<SearhedMoviesPage />} />


          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
