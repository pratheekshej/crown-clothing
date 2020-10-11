import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { emailSignInStart, googleSignInStart, signingInOrOut } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
// import { auth } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { signingIn, emailSignInToStart } = this.props;
        const { email, password } = this.state;
        signingIn();
        emailSignInToStart(email, password);
        /* if (email && password) {
            try {
                await auth.signInWithEmailAndPassword(email, password);
                this.setState({ email: '', password: '' });
                signingIn();
            } catch (error) {
                console.error(`Login Error ::> ${error}`);
                signingIn();
            }
        } */
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { googleSignInToStart } = this.props;
        return (
            <div className="sign-in">
                <h2>I already have an account!</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="Email" />

                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
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
}

const mapDispatchToProps = (dispatch) => ({
    signingIn: () => dispatch(signingInOrOut()),
    googleSignInToStart: () => dispatch(googleSignInStart()),
    emailSignInToStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);