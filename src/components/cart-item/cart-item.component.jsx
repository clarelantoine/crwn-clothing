import {
    CartItemContainer,
    CartItemImage,
    CartItemDetails,
    CartItemName,
    CartItemQuantity,
} from './cart-item.styles.jsx';

export default function CartItem({ cartItem }) {
    // destructure the cart item object
    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <CartItemContainer>
            <CartItemImage src={imageUrl} alt={name} />
            <CartItemDetails>
                <CartItemName>{name}</CartItemName>
                <CartItemQuantity>
                    {quantity} x ${price}
                </CartItemQuantity>
            </CartItemDetails>
        </CartItemContainer>
    );
}
