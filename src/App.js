import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from './utils/firebase/firebase.utils';

import { setCurrentUser } from './store/user/user.action';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // subscribe/unsbscribe to the user's sign-in state
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                // if user not null, then create the user doc
                createUserDocumentFromAuth(user);
            }
            // set auth user to setCurrentUser
            dispatch(setCurrentUser(user));
            // console.log(user);
        });

        return unsubscribe;
        // eslint-disable-next-line
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
}
