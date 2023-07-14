import { Outlet } from 'react-router-dom';
import { useContext } from 'react';

import CartIcon from '../../components/cart-icon/car-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { SignOutUser } from '../../utils/firebase/firebase.utils';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
} from './navigation.styles';

export default function Navigation() {
    const { currentUser } = useContext(UserContext); // get user context
    const { isCartOpen } = useContext(CartContext); // get cart context

    // user sign out handler
    const signOutHandler = async () => {
        // sign out auth user firebase
        await SignOutUser();
    };

    /*
     * if user context (currentUser) is null, show sign in.
     * Else, show sign out.
     */
    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">Shop</NavLink>
                    {currentUser ? (
                        <NavLink onClick={signOutHandler}>Sign Out</NavLink>
                    ) : (
                        <NavLink to="/auth">Sign In</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
}
