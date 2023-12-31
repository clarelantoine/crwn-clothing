import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { SignUpContainer, Title } from './sign-up-form.styles';
import { signUpStart } from '../../store/user/user.action';

// default form fields value (empty)
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export default function SignUpForm() {
    // create form fields state based on the the default value
    const [formFields, setFormFields] = useState(defaultFormFields);

    const dispatch = useDispatch();

    // deconstruct formFields state object
    const { displayName, email, password, confirmPassword } = formFields;

    // reset form field to default/empty
    const resetFormFields = () => setFormFields(defaultFormFields);

    // handle fields onChange event
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    // handle form onSubmit event
    const handleSubmit = async (event) => {
        // prevent onSubmit default event behaviour
        event.preventDefault();

        // check if passwords are matching
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        dispatch(signUpStart(email, password, displayName));
        resetFormFields();
        // // if passwords are matching, try to create the user account
        // try {
        //     // create the user account
        //     const { user } = await createAuthUserWithEmailAndPassword(
        //         email,
        //         password
        //     );
        //     // create the user doc
        //     await createUserDocumentFromAuth(user, { displayName });
        //     // reset the form fields
        //     resetFormFields();
        //     // catch any error that occur during user creation
        // } catch (error) {
        //     // error, email already in use
        //     if (error.code === 'auth/email-already-in-use') {
        //         alert('Cannot create user, email already in use');
        //     } else {
        //         // unknown error
        //         console.log('User creation encountered an error', error);
        //     }
        // }
    };

    return (
        <SignUpContainer>
            <Title>Don't have an account?</Title>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />
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
                <FormInput
                    label="Confirm Passsword"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}
