import React, { useState } from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { emailSignInStart, googleSignInStart, signingInOrOut } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
// import { auth } from '../../firebase/firebase.utils';

const SignIn = ({ emailSignInToStart, googleSignInToStart, signingIn }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        signingIn();
        emailSignInToStart(email, password);
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className="sign-in">
            <h2>I already have an account!</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    value={email}
                    handleChange={handleChange}
                    label="Email" />

                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    handleChange={handleChange}
                    label="Password" />

                <div className="buttons">
                    <CustomButton type="submit" value="Submit">
                        Sign In
                    </CustomButton>
                    <CustomButton type="button" isGoogleSignIn={true} onClick={googleSignInToStart}>
                        Sign In With Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    signingIn: () => dispatch(signingInOrOut()),
    googleSignInToStart: () => dispatch(googleSignInStart()),
    emailSignInToStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);