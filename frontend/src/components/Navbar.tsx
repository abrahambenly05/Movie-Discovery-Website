import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Navbar() {
    const navigate = useNavigate()
    const { isLoggedIn, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-red-500">
                    CineScope
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="text-gray-300 hover:text-white">
                        Home
                    </Link>
                    <Link to="/search" className="text-gray-300 hover:text-white">
                        Search
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/watchlist"
                                className="text-gray-300 hover:text-white"
                            >
                                Watchlist
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-300 hover:text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to ="/login" className="text-gray-300 hover:text-white">
                            login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar