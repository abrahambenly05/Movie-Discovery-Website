import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./auth-context-object";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null)

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])
    /* eslint-enable react-hooks/set-state-in-effect */

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    return (
        <AuthContext.Provider
            value={{ token, isLoggedIn: Boolean(token), login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}