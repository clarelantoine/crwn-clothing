import { Group, InputField, InputLabel } from './form-input.styles';

export default function FormInput(props) {
    const { label, ...otherProps } = props;

    return (
        <Group>
            <InputField {...otherProps} />
            {label && (
                <InputLabel $shrink={otherProps.value.length}>
                    {label}
                </InputLabel>
            )}
        </Group>
    );
}
