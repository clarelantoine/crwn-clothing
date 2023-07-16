import DirectoryItem from '../directory-item/directory-item.component';

import { DirectoryContainer } from './directory.styles';

const categories = [
    {
        id: 1,
        title: 'hats',
        imageUrl: '/images/hats.jpg',
        route: 'shop/hats',
    },
    {
        id: 2,
        title: 'jackets',
        imageUrl: '/images/jackets.jpg',
        route: 'shop/jackets',
    },
    {
        id: 3,
        title: 'sneakers',
        imageUrl: '/images/sneakers.jpg',
        route: 'shop/sneakers',
    },
    {
        id: 4,
        title: 'womens',
        imageUrl: '/images/womens.jpg',
        route: 'shop/womens',
    },
    {
        id: 5,
        title: 'mens',
        imageUrl: '/images/men.jpg',
        route: 'shop/mens',
    },
];

export default function Directory() {
    return (
        <DirectoryContainer>
            {categories.map((category) => (
                <DirectoryItem key={category.id} category={category} />
            ))}
        </DirectoryContainer>
    );
}
