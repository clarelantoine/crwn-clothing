import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { SignInContainer, Title, ButtonContainer } from './sign-in-form.styles';
import {
    emailSignInStart,
    googleSignInStart,
} from '../../store/user/user.action';

// default form fields value (empty)
const defaultFormFields = {
    email: '',
    password: '',
};

export default function SignInForm() {
    // create form fields state based on the the default value
    const [formFields, setFormFields] = useState(defaultFormFields);

    const dispatch = useDispatch();

    // deconstruct formFields state object
    const { email, password } = formFields;

    // reset form field to default/empty
    const resetFormFields = () => setFormFields(defaultFormFields);

    // sign in with google
    const signInWithGoogle = () => {
        dispatch(googleSignInStart());
    };

    // handle fields onChange event
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    // handle form onSubmit event
    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(emailSignInStart(email, password));
        // reset all form fields
        resetFormFields();
        // try {
        //     dispatch(emailSignInStart(email, password));
        //     // reset all form fields
        //     resetFormFields();
        // } catch (error) {
        //     switch (error.code) {
        //         case 'auth/wrong-password':
        //             alert('Incorrect password');
        //             break;
        //         case 'auth/user-not-found':
        //             alert('No user associated with this email');
        //             break;
        //         default:
        //             console.log('User sign-in encountered an error', error);
        //     }
        // }
    };

    return (
        <SignInContainer>
            <Title>Already have an account?</Title>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                    <Button
                        type="button"
                        onClick={signInWithGoogle}
                        buttonType={BUTTON_TYPE_CLASSES.google}
                    >
                        Google Sign In
                    </Button>
                </ButtonContainer>
            </form>
        </SignInContainer>
    );
}
