import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import CartIcon from '../../components/cart-icon/car-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { SignOutUser } from '../../utils/firebase/firebase.utils';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
} from './navigation.styles';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

export default function Navigation() {
    // get the current user from the global redux state
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

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
