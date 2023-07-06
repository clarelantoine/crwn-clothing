import './car-icon.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

export default function CartIcon() {
    // get cart context
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    // toggle cart dropdown
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <div
            className="cart-icon-container"
            onClick={toggleIsCartOpen}
            onKeyDown={toggleIsCartOpen}
            role="button"
            tabIndex="0"
        >
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
}
