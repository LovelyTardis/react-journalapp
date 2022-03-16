import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import { JournalScreen } from '../components/journal/JournalScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { startLoadingEntries } from '../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingEntries(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn])
    
    if(checking) {
        return (
            <h1>Por favor, espera...</h1>
        )
    }
    return (
        <Router>
            <div>
                <Routes>
                    <Route 
                        path="/auth/*"
                        element={
                            <PublicRoutes isAuthenticated={isLoggedIn}>
                                <AuthRouter />
                            </PublicRoutes>
                        }
                    />
                    <Route 
                        path="/"
                        element={
                            <PrivateRoutes isAuthenticated={isLoggedIn}>
                                <JournalScreen />
                            </PrivateRoutes>
                        }
                    />
                </Routes>
            </div>
        </Router>
    )
}
