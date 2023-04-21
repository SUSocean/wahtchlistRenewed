import SearchedMoviesList from "./SearchedMoviesList";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMovies,
    selectSearchedMoviesQuery,
    selectSearchedMoviesTotalPages,
    selectSearchedMoviesCurrentPage
} from "./searchedMoviesSlice";
import { useState, useEffect } from "react";
import SearchMovieForm from "./SearchMovieForm";

const SearhedMoviesPage = () => {
    const dispatch = useDispatch()
    const currentQuery = useSelector(selectSearchedMoviesQuery)
    const totalPages = useSelector(selectSearchedMoviesTotalPages)
    const getCurrentPage = useSelector(selectSearchedMoviesCurrentPage)

    const [currentPage, setCurrentPage] = useState(getCurrentPage)

    useEffect(() => {
        setCurrentPage(getCurrentPage)
    }, [getCurrentPage])

    const handleClick = (pageNumber) => {
        dispatch(fetchMovies({ movie: currentQuery, page: pageNumber }))
    }

    const canBeClicked = pageNumber => Boolean(pageNumber === currentPage)

    let PageSelection

    if (totalPages > 0) {
        if (totalPages < 11) {
            PageSelection = [...Array(totalPages)].map((page, index) => {
                const pageNumber = index + 1
                return (
                    <button
                        onClick={() => {
                            handleClick(pageNumber)
                        }}
                        disabled={canBeClicked(pageNumber)}
                        key={index}
                        className="select-page-button"
                    >
                        {pageNumber}
                    </button>
                )

            })
        } else {
            let displayedOptions
            if (currentPage <= 6) {
                displayedOptions = [...Array(9)].map((page, index) => {
                    const pageNumber = index + 1
                    return (
                        <button
                            onClick={() => {
                                handleClick(pageNumber)
                            }}
                            disabled={canBeClicked(pageNumber)}
                            key={index}
                            className="select-page-button"
                        >
                            {pageNumber}
                        </button>
                    )
                })
            } else {
                let startingPageNumber = currentPage - 4
                displayedOptions = [...Array(9)].map((page, index) => {
                    const pageNumber = startingPageNumber + index

                    if (pageNumber <= totalPages) {
                        return (
                            <button
                                onClick={() => {
                                    handleClick(pageNumber)
                                }}
                                disabled={canBeClicked(pageNumber)}
                                key={index}
                                className="select-page-button"
                            >
                                {pageNumber}
                            </button>
                        )
                    }
                })
            }

            PageSelection = (
                <>
                    {currentPage > 6 &&
                        <>
                            <button
                                onClick={() => {
                                    handleClick(1)
                                }}
                                disabled={canBeClicked({ pageNumber: 1 })}
                                key={1}
                                className="select-page-button"
                            >
                                1
                            </button>
                            <span>...</span>
                        </>
                    }
                    {displayedOptions}
                    {currentPage < totalPages - 4 &&
                        <>
                            <span>...</span>
                            <button
                                onClick={() => {
                                    handleClick(totalPages)
                                }}
                                disabled={canBeClicked(totalPages)}
                                key={totalPages}
                                className="select-page-button"
                            >
                                {totalPages}
                            </button>
                        </>
                    }
                </>
            )
        }
    }


    return (
        <>
            <SearchMovieForm />
            <div className="page-list">
                <SearchedMoviesList />
            </div>
            {totalPages > 0 && <div
                className="select-page-button-wrapper"
            >
                {PageSelection}
            </div>}
        </>
    )
}

export default SearhedMoviesPage
