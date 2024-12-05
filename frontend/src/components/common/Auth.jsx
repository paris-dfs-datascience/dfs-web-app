import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logoutUser } from '../../services/firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

const Auth = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('Current user:', currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            setError('');
        } catch (err) {
            console.error('Google sign in error:', err);
            setError(err.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            console.log('Logout successful');
        } catch (err) {
            console.error('Logout error:', err);
            setError(err.message);
        }
    };

    if (user) {
        return (
            <div>
                <h2>Welcome, {user.email}!</h2>
                <button onClick={handleLogout}>Logout</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        );
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Auth;