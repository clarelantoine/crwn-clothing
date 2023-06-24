import { useContext, useState } from 'react';
import {
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in-form.styles.scss';

// default form fields value (empty)
const defaultFormFields = {
    email: '',
    password: '',
};

export default function SignInForm() {
    // create form fields state based on the the default value
    const [formFields, setFormFields] = useState(defaultFormFields);

    // deconstruct formFields state object
    const { email, password } = formFields;

    // get the user context
    const { setCurrentUser } = useContext(UserContext);

    // reset form field to default/empty
    const resetFormFields = () => setFormFields(defaultFormFields);

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        // set user context
        setCurrentUser(user);
    };

    // handle fields onChange event
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    // handle form onSubmit event
    const handleSubmit = async (event) => {
        // prevent onSubmit default event behaviour
        event.preventDefault();

        // if passwords are matching, try to create the user account
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            // set value of auth user to current user context
            setCurrentUser(user);
            // reset all form fields
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log('User sign-in encountered an error', error);
            }
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
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

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button
                        type="button"
                        onClick={signInWithGoogle}
                        buttonType="google"
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
}
