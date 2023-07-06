import './car-icon.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

export default function CartIcon() {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

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
            <span className="item-count">10</span>
        </div>
    );
}