/**
 * user.js
 *
 * login and logout functions that are used in the store.
 */

import axios from 'axios'
import router from '@/router';

export const loginFunction = async (email, password) => {
    try {
        const res = await axios.post('http://localhost:3001/auth/log-in', {
            email: email,
            password: password,
        })

        router.push({ name: 'home' })
    } catch (error) {
        console.log(error);
    }


    console.log('heyy')
}

export const logout = async () => {
    const refreshToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('refreshToken='));

    if (!refreshToken) {
        // Handle missing token (e.g., user already logged out)
        return;
    }

    // Extract token value
    const actualToken = refreshToken.split('=')[1];

    console.log(actualToken)
    // ... Send refresh token to the backend logout endpoint ...

    const res = await axios.post('http://localhost:3001/auth/log-out', {
        refreshToken: actualToken,
    }, { withCredentials: true })

    console.log(res)
}

