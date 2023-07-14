import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';

import {
    CartDropdownContainer,
    CartItems,
    CheckoutButton,
} from './cart-dropdown.styles';

export default function CartDropdown() {
    // get cart context
    const { cartItems, setIsCartOpen } = useContext(CartContext);

    // useNavigate
    const navigate = useNavigate();

    // go to checkout handler
    const goToCheckoutHandler = () => {
        navigate('/checkout');
        setIsCartOpen(false);
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </CartItems>
            <CheckoutButton onClick={goToCheckoutHandler}>
                Go to checkout
            </CheckoutButton>
        </CartDropdownContainer>
    );
}
