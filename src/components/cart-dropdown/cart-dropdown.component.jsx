import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage,
} from './cart-dropdown.styles';

export default function CartDropdown() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    // useNavigate
    const navigate = useNavigate();

    // go to checkout handler
    const goToCheckoutHandler = () => {
        navigate('/checkout');
        dispatch(setIsCartOpen(false));
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
        </CartDropdownContainer>
    );
}
