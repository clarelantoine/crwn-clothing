import { useDispatch, useSelector } from 'react-redux';

import {
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
    CheckoutItemContainer,
    ImageContainer,
    Image,
    Name,
    Quantity,
    Price,
    Arrow,
    Value,
    RemoveButton,
} from './checkout-item.styles';

export default function CheckoutItem({ cartItem }) {
    // destructure the checkout item
    const { imageUrl, name, quantity, price } = cartItem;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    // handlers function
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

    const removeItemHandler = () =>
        dispatch(removeItemFromCart(cartItems, cartItem));

    const clearItemHandler = () =>
        dispatch(clearItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <Image src={imageUrl} alt={name} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}
