import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

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
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
        </div>
    );
}
