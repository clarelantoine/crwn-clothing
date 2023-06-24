import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss';

export default function Directory(props) {
    const { categories } = props;

    return (
        <div className="directory-container">
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    );
}
