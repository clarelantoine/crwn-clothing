import './directory-item.styles.scss';

export default function DirectoryItem(props) {
    const { category } = props;
    const { title, imageUrl } = category;

    return (
        <div className="directory-item-container">
            <div
                className="background-image"
                style={{ background: `url(${imageUrl})` }}
            />
            <div className="body">
                <h2>{title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    );
}
