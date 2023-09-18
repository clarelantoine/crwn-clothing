import { Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../../components/cart-icon/car-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
} from './navigation.styles';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

export default function Navigation() {
    // get the current user from the global redux state
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const dispatch = useDispatch();

    // user sign out handler
    const signOutHandler = () => dispatch(signOutStart());

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
