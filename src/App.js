import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'
import SearhedMoviesPage from "./features/searchedMovies/SearchMoviesPage";
import SavedMoviesList from "./features/savedMovies/SavedMoviesList";
import SingleMoviePage from "./components/SingleMoviePage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<SearhedMoviesPage />} />

            <Route path="/watchlist" element={<SavedMoviesList />} />

            <Route path="/movie/:id" element={<SingleMoviePage />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
