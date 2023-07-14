import { Group, InputField, InputLabel } from './form-input.styles';

export default function FormInput(props) {
    const { label, ...otherProps } = props;

    return (
        <Group>
            <InputField {...otherProps} />
            {label && (
                <InputLabel
                    className={`${
                        otherProps.value.length ? 'shrink' : ''
                    } form-input-label`}
                >
                    {label}
                </InputLabel>
            )}
        </Group>
    );
}
