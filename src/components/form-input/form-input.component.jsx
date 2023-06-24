import './form-input.styles.scss';

export default function FormInput(props) {
    const { label, ...otherProps } = props;

    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {label && (
                <label
                    className={`${
                        otherProps.value.length ? 'shrink' : ''
                    } form-input-label`}
                >
                    {label}
                </label>
            )}
        </div>
    );
}
