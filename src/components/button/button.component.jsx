import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
};

export default function Button(props) {
    const { children, buttonType, ...otherPorps } = props;

    return (
        <button
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherPorps}
        >
            {children}
        </button>
    );
}
