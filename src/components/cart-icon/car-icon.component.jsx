import { useDispatch, useSelector } from 'react-redux';

import { CartIconContainer, ShoppingIcon, ItemCount } from './car-icon.styles';
import { setIsCartOpen } from '../../store/cart/cart.action';
import {
    selectCartCount,
    selectIsCartOpen,
} from '../../store/cart/cart.selector';

export default function CartIcon() {
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    // toggle cart dropdown
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

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
