import React, { useState } from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUp, }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {},
        isBlurred: { confirmPassword: false },
        isDirty: { confirmPassword: false }
    });
    const {
        displayName,
        email,
        password,
        confirmPassword,
        error,
        // isBlurred,
        // isDirty,
    } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            passwordMismatchError(error);
            return;
        }
        signUp({ email, password, displayName });
        clearFormFields();
    }

    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
        /* if (name === 'confirmPassword') {
            if (confirmPassword !== '') {
                setUserCredentials({ ...userCredentials, isDirty: { confirmPassword: true } });
                if (password === confirmPassword) {
                    error['pwdMismatch'] = null;
                    setUserCredentials({ ...userCredentials, error: error });
                    return;
                } else if (isBlurred['confirmPassword'] && isDirty['confirmPassword']) {
                    if (password !== confirmPassword) {
                        passwordMismatchError.apply(error);
                    }
                }
            }
        } */
    }

    const handleBlur = event => {
        const { name } = event.target;
        const { password, confirmPassword, error } = this.state;
        if (name === 'confirmPassword') {
            if (confirmPassword !== '' && password !== confirmPassword) {
                setUserCredentials({ ...userCredentials, isBlurred: { confirmPassword: true } });
                passwordMismatchError(error);
            }
        }
    }

    const passwordMismatchError = (error) => {
        error['pwdMismatch'] = 'Passwords do not match!';
        setUserCredentials({ ...userCredentials, error: error });
        return;
    }

    const clearFormFields = () => {
        setUserCredentials({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: {},
            isBlurred: { confirmPassword: false },
            isDirty: { confirmPassword: false }
        });
    }

    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    onChange={handleChange}
                    value={displayName}
                    label="Name" />

                <FormInput
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    label="Email" />

                <FormInput
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                    label="Password" />

                <FormInput
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={confirmPassword}
                    error={error['pwdMismatch']}
                    label="Confirm password" />

                <CustomButton type="submit" value="Submit">SIGN UP</CustomButton>
            </form>
        </div>
    );

}

const mapDispatchToProps = (dispatch) => ({
    signUp: (userCreds) => dispatch(signUpStart(userCreds))
});

export default connect(null, mapDispatchToProps)(SignUp);