import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ShoppingIcon, ItemCount } from './car-icon.styles';

export default function CartIcon() {
    // get cart context
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    // toggle cart dropdown
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer
            onClick={toggleIsCartOpen}
            onKeyDown={toggleIsCartOpen}
            role="button"
            tabIndex="0"
        >
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}
