import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {
    CheckoutContainer,
    Header,
    HeaderBlock,
    Total,
} from './checkout.styles';

export default function Checkout() {
    // get the cart context
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <Header>
                <HeaderBlock>Product</HeaderBlock>
                <HeaderBlock>Description</HeaderBlock>
                <HeaderBlock>Quantity</HeaderBlock>
                <HeaderBlock>Price</HeaderBlock>
                <HeaderBlock>Remove</HeaderBlock>
            </Header>
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    );
}
