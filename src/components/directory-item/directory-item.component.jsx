import {
    BackgroundImage,
    Body,
    DirectoryItemContainer,
    ShopNowButton,
    Title,
} from './directory-item.styles';

export default function DirectoryItem(props) {
    const { category } = props;
    const { title, imageUrl } = category;

    return (
        <DirectoryItemContainer>
            <BackgroundImage style={{ background: `url(${imageUrl})` }} />
            <Body>
                <Title>{title}</Title>
                <ShopNowButton>Shop now</ShopNowButton>
            </Body>
        </DirectoryItemContainer>
    );
}
