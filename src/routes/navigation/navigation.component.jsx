import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';

import CartIcon from '../../components/cart-icon/car-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { SignOutUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.styles.scss';

export default function Navigation() {
    // get user context
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

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
            <nav className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    {currentUser ? (
                        <Link className="nav-link" onClick={signOutHandler}>
                            Sign Out
                        </Link>
                    ) : (
                        <Link className="nav-link" to="/auth">
                            Sign In
                        </Link>
                    )}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </nav>
            <Outlet />
        </>
    );
}
