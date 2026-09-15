import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MovieDetailPage from './pages/MovieDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import WatchlistPage from './pages/WatchlistPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/search',
        element: <SearchPage />,
    },
    {
        path: '/movie/:id',
        element: <MovieDetailPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/watchlist',
        element: <WatchlistPage />,
    },
])

export default router