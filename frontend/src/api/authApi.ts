import axiosInstance from "./axiosInstances";

interface AuthResponse {
    access_token: string
    token_type: string
}

interface UserResponse {
    id: number
    email: string
    created_at: string
}

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', { email, password })
    return response.data
}

export const registerUser = async (
    email: string,
    password: string
): Promise<UserResponse> => {
    const response = await axiosInstance.post('/auth/register', { email, password })
    return response.data
}