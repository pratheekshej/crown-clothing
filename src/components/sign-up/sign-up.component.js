import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: {},
            isBlurred: { confirmPassword: false },
            isDirty: { confirmPassword: false }
        };
    }

    componentDidMount() {
        this.clearFormFields();
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword, error } = this.state;
        const { signUp } = this.props;
        if (password !== confirmPassword) {
            error['pwdMismatch'] = 'Passwords do not match!';
            this.setState({ error: error });
            return;
        }
        signUp({ email, password, displayName });
        this.clearFormFields();
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            const { password, confirmPassword, error, isBlurred, isDirty } = this.state;
            if (name === 'confirmPassword') {
                if (confirmPassword !== '') {
                    this.setState({ isDirty: { confirmPassword: true } });
                    if (password === confirmPassword) {
                        error['pwdMismatch'] = null;
                        this.setState({ error: error });
                        return;
                    } else if (isBlurred.confirmPassword && isDirty.confirmPassword) {
                        if (password !== confirmPassword) {
                            this.passwordMismatchError.apply(error);
                        }
                    }
                }
            }
        });
    }

    handleBlur = event => {
        const { name } = event.target;
        const { password, confirmPassword, error } = this.state;
        if (name === 'confirmPassword') {
            if (confirmPassword !== '' && password !== confirmPassword) {
                this.setState({ isBlurred: { confirmPassword: true } });
                this.passwordMismatchError.apply(error);
            }
        }
    }

    passwordMismatchError = (error) => {
        error['pwdMismatch'] = 'Passwords do not match!';
        this.setState({ error: error });
        return;
    }

    clearFormFields = () => {
        this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: {},
            isBlurred: { confirmPassword: false },
            isDirty: { confirmPassword: false }
        });
    }

    render() {
        const { displayName, email, password, confirmPassword, error } = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-in-form" onClick={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        onChange={this.handleChange}
                        value={displayName}
                        label="Name" />

                    <FormInput
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        value={email}
                        label="Email" />

                    <FormInput
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={password}
                        label="Password" />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={confirmPassword}
                        error={error['pwdMismatch']}
                        label="Confirm password" />

                    <CustomButton type="submit" value="Submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    signUp: (userCreds) => dispatch(signUpStart(userCreds))
});

export default connect(null, mapDispatchToProps)(SignUp);